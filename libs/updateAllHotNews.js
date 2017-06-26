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

        console.log(`start update all hot news`);
        let mainMenus = await Menu.find()
            .where('isTrashed').equals(false)
            .where('level').equals(0)
            .where('status').equals('OPEN')
            .or([
                { isPermanented: true },
                { $and: [
                    { startedAt: { $lte: Date.now() }},
                    { endedAt: { $gte: Date.now() }}
                ]}
            ])
            .select('_id categoryName')
            .execAsync();

        await Promise.map(mainMenus, (menu) => {
            return News.find()
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .where('startedAt').gte(moment.tz('Asia/Taipei').add(-1, 'day'))
                .where('MainMenu').equals(menu._id)
                .select('_id')
                .execAsync()
                .then((newsList) => {
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
                            // .where('_id').in(newsIds)
                            .select('_id sn title shortTitle')
                            .execAsync();
                    });

                    // let newsIds = _.map(pageviews, (pageview) => { return pageview.newsId });
                    // return Promise.resolve(newsIds);
                })
                // .then((newsIds) => {
                //     return News.find()
                //         .where('_id').in(newsIds)
                //         .select('_id sn title shortTitle')
                //         .execAsync();
                // })
                .then((hotNewsInMenu) => {
                    debug(`hotNews-${menu.categoryName} = %j`, hotNewsInMenu);
                    return redis.setValue(`hotNews-${menu.categoryName}`, hotNewsInMenu, 3600);
                });
        });
        console.log(`finished update all hot news`);

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};
