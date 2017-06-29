import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateAllHotNews');

import Promise from 'bluebird';
import moment from 'moment-timezone';
import _ from 'lodash';

import { News, Menu } from '../models';
import { Pageview } from '../pvModels';
import redis from '../redis';

module.exports = async () => {
    try {
        console.log(`== Start Update All Hot News ==`);
        let menus = await Menu.find()
            .where('isTrashed').equals(false)
            .where('status').equals('OPEN')
            .where('isPermanented').equals(true)
            .where('isExternal').equals(false)
            .select('_id categoryName level')
            .execAsync();

        await Promise.map(menus, (menu) => {

            let cursor = News.find()
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .where('startedAt').gte(moment.tz('Asia/Taipei').add(-1, 'day'));

            if(menu.level === 0) {
                cursor.where('MainMenu').equals(menu._id);
            }

            if(menu.level === 1) {
                cursor.where('menus').equals(menu._id);
            }

            return cursor
                .select('_id')
                .execAsync()
                .then((newsList) => {
                    console.log(`== Find ${menu.categoryName} ${newsList.length} news ==`);
                    let newsIds = _.map(newsList, (news) => { return news._id });
                    return Promise.resolve(newsIds);
                })
                .then((newsIds) => {
                    return Pageview.find()
                        .where('newsId').in(newsIds)
                        .sort('-totalScore')
                        .limit(10)
                        .select('newsId')
                        .execAsync();
                })
                .then((pageviews) => {

                    return Promise.mapSeries(pageviews, (pageview) => {
                        return News.findById(pageview.newsId)
                            .select('_id sn title shortTitle')
                            .execAsync();
                    });
                })
                .then((hotNewsInMenu) => {
                    debug(`hotNews-${menu.categoryName} = %j`, hotNewsInMenu);
                    return redis.setValue(`hotNews-${menu.categoryName}`, hotNewsInMenu, 3600);
                });
        }, { concurrency: 5 });
        console.log(`== Finished Update All Hot News ==`);

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};
