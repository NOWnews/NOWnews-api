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

        let now = moment().format('YYYY-MM-DD HH:mm');

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
            .select('_id sn')
            .execAsync();

        await Promise.map(mainMenus, (menu) => {
            return News.find()
                .where('isTrashed').equals(false)
                .where('MainMenu').equals(menu._id)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .where('startedAt').gte(moment(now).add(-1, 'hours'))
                .limit(10)
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
                        .select('newsId')
                        .execAsync();
                })
                .then((pageviews) => {
                    let newsIds = _.map(pageviews, (pageview) => { return pageview.newsId });
                    return Promise.resolve(newsIds);
                })
                .then((newsIds) => {
                    return News.find()
                        .where('_id').in(newsIds)
                        .sort('-startedAt')
                        .select('_id sn title shortTitle')
                        .execAsync();
                })
                .then((hotNewsInMenu) => {
                    debug(`hotNewsInMenu${menu.sn} = %j`, hotNewsInMenu);
                    return redis.setValue(`hotNewsInMenu${menu.sn}`, hotNewsInMenu, 3600);
                });
        });

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};