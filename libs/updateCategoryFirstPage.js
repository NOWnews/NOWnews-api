import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateCategoryFirstPage');

import Promise from 'bluebird';

import { News, Menu } from '../models';
import pagination from './pagination';
import redis from '../redis';
import config from 'config';

module.exports = async (categoryName, limit, skip, page) => {
    try {

        limit = limit || config.get('general.queryOptions.desktop.limit');
        skip = skip || config.get('general.queryOptions.desktop.skip');
        page = page || config.get('general.queryOptions.desktop.page'); 

        let menu = await Menu.findOne()
            .where('categoryName').equals(categoryName)
            .execAsync();

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


        let [newsList, total] = await Promise.all([
            cursor
                .populate('MainMenu MainPhoto MainVideo')
                .select('sn title shortTitle MainMenu MainPhoto MainVideo type startedAt')
                .limit(limit)
                .skip(skip)
                .sort('-startedAt')
                .execAsync(),
            totalCursor.limit(1000).countAsync()
        ]);
        debug('newsList = %j', newsList);
        debug('total = %d', total);

        let pageData = pagination(total, limit, page, skip);
        let key = `category-${menu.categoryName}-${limit}news-firstPage`;
        console.log(`** Update ${menu.categoryName} ${newsList.length} News At First Page **`);

        let cacheData = await redis.setValue(key, {
            newsList,
            pageData,
            menu
        }, 3600);

        return Promise.resolve(cacheData);
    } catch (err) {
        return Promise.reject(err);
    }
};
