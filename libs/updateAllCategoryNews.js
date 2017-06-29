import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateAllCategoryNews');

import Promise from 'bluebird';
import moment from 'moment-timezone';
import _ from 'lodash';

import { News, Menu } from '../models';
import pagination from './pagination';
import redis from '../redis';

module.exports = async () => {
    try {

        // 之後這些參數要抽出來放在 config
        const limit = 15;
        const skip = 0;
        const page = 1;

        let menus = await Menu.find()
            .where('isTrashed').equals(false)
            .where('status').equals('OPEN')
            .where('isPermanented').equals(true)
            .execAsync();

        await Promise.mapSeries(menus, (menu) => {
            let cursor = News.find()
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now());
            let totalCursor = News.find()
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now());

            if(menu.level === 0) {
                cursor.where('MainMenu').equals(menu._id);
            }

            if(menu.level === 1) {
                cursor.where('menus').equals(menu._id);
            }

            return Promise.all([
                cursor
                    .populate('MainMenu MainPhoto MainVideo')
                    .select('sn title shortTitle MainMenu MainPhoto MainVideo type startedAt')
                    .limit(limit)
                    .skip(skip)
                    .sort('-startedAt')
                    .execAsync(),
                totalCursor.limit(1000).countAsync()
            ])
            .then(([newsList, total]) => {
                debug('newsList = %j', newsList);
                debug('total = %d', total);

                let pageData = pagination(total, limit, page, skip);
                let key = `category-${menu.categoryName}-firstPage`;
                return redis.setValue(key, {
                    newsList,
                    pageData,
                    menu
                }, 3600);
            });
        });

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};
