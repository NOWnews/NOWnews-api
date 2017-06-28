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
            .or([
                { isPermanented: true },
                { $and: [
                    { startedAt: { $lte: Date.now() }},
                    { endedAt: { $gte: Date.now() }}
                ]}
            ]);
        debug('menus = %j', menus);

        await Promise.each(menus, (menu) => {
            return Promise.all([
                News.find()
                    .where('isTrashed').equals(false)
                    .where('status').equals('RELEASE')
                    .where('startedAt').lte(Date.now())
                    .or([
                        { MainMenu: menu._id },
                        { Menus: menu._id }
                    ])
                    .populate('MainMenu MainPhoto MainVideo')
                    .select('sn title shortTitle MainMenu MainPhoto MainVideo type startedAt')
                    .limit(limit)
                    .skip(skip)
                    .sort('-startedAt')
                    .execAsync(),
                News.find()
                    .where('isTrashed').equals(false)
                    .where('status').equals('RELEASE')
                    .where('startedAt').lte(Date.now())
                    .or([
                        { MainMenu: menu._id },
                        { Menus: menu._id }
                    ])
                    .limit(1000).countAsync()
            ])
            .then(([newsList, total]) => {
                debug('newsList = %j', newsList);
                debug('total = %d', total);

                let pageData = pagination(total, limit, page, skip);
                let key = `category-${menu.categoryName}-firstPage`;
                debug('category key = %s', key);
                console.log(`updated category ${menu.categoryName} first page`);
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
