import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateCategoryFirstPage');

import Promise from 'bluebird';

import { News, Menu, ColumnSpecialChannel } from '../models';
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
            .where('isTrashed').equals(false)
            .where('status').equals('OPEN')
            .where('isPermanented').equals(true)
            .where('isExternal').equals(false)
            .execAsync();

        // 處理業配專欄特輯版型
        let columnSpecialChannel = null;
        if(menu.template === "SPECIALCHANNEL") {
            columnSpecialChannel = await ColumnSpecialChannel.findOne()
                .where('isTrashed').equals(false)
                .or([
                    { Menu: menu._id },
                    { SubMenus: menu._id }
                ])
                .populate([
                    {
                        path: 'Menu',
                        select: 'name url template categoryName'
                    },
                    {
                        path: 'SubMenus',
                        select: 'name url template categoryName'
                    }
                ])
                .execAsync();
        }

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
            menu,
            columnSpecialChannel
        }, 3600);

        return Promise.resolve(cacheData);
    } catch (err) {
        return Promise.reject(err);
    }
};
