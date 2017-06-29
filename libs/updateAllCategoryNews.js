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
        console.log(`** Start Update All Category News **`);
        // 之後這些參數要抽出來放在 config
        const limit = 15;
        const skip = 0;
        const page = 1;

        let menus = await Menu.find()
            .where('isTrashed').equals(false)
            .where('status').equals('OPEN')
            .where('isPermanented').equals(true)
            .where('isExternal').equals(false)
            .execAsync();

        await Promise.map(menus, (menu) => {

            let cursor = News.find();
            let totalCursor = News.find();

            if(menu.level === 0) {
                cursor.where('MainMenu').equals(menu._id);
                totalCursor.where('MainMenu').equals(menu._id);
            }

            if(menu.level === 1) {
                cursor.where('Menus').equals(menu._id);
                totalCursor.where('Menus').equals(menu._id);
            }

            cursor
                .where('status').equals('RELEASE')
                .where('isTrashed').equals(false)
                .where('startedAt').lte(Date.now());
            totalCursor
                .where('status').equals('RELEASE')
                .where('isTrashed').equals(false)
                .where('startedAt').lte(Date.now());

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
                console.log(`** Update ${menu.categoryName} ${newsList.length} News At First Page **`);
                return redis.setValue(key, {
                    newsList,
                    pageData,
                    menu
                }, 3600);
            });
        }, { concurrency: 10 });

        console.log(`** Finish Update All Category News **`);

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};
