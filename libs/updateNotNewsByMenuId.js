import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateNotNewsByMenuId');

import Promise from 'bluebird';
import moment from 'moment-timezone';
import _ from 'lodash';

import { News, Menu } from '../models';
import { Pageview } from '../pvModels';
import redis from '../redis';

module.exports = async (menuId) => {
    try {

        console.log(`start update ${menuId} hot news`);

        let menu = await Menu.findById(menuId).execAsync();

        if(!menu) {
            throw new Error('19006');
        }

        let pageviews = await News.find()
            .where('isTrashed').equals(false)
            .where('status').equals('RELEASE')
            .where('startedAt').lte(Date.now())
            .where('startedAt').gte(moment.tz('Asia/Taipei').add(-1, 'day'))
            .where('MainMenu').equals(menuId)
            .select('_id')
            .execAsync()
            .then((newsList) => {
                let newsIds = _.map(newsList, (news) => {
                    return news._id
                });

                return Pageview.find()
                    .where('newsId').in(newsIds)
                    .sort('-totalScore')
                    .limit(10)
                    .select('newsId')
                    .execAsync();
            });

        await Promise.mapSeries(pageviews, (pageview) => {
            return News.findById(pageview.newsId)
                .select('_id sn title shortTitle')
                .execAsync();
            })
            .then((hotNewsInMenu) => {
                debug(`hotNews-${menu.categoryName} = %j`, hotNewsInMenu);
                return redis.setValue(`hotNews-${menu.categoryName}`, hotNewsInMenu, 3600);
            });

        console.log(`finished update ${menuId} hot news`);
        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};
