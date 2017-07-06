/*
 * query 條件已經下過 index 了
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:category:list');

import Promise from 'bluebird';

import { pagination } from '../../../libs';
import { News, Menu } from '../../../models';
import redis from '../../../redis';

module.exports = async (req, res, next) => {
    try {
        let { limit, page, skip } = req.query;
        let { categoryName, type } = req.params;

        if(!type && page === 1) {
            let categoryFistPage = await redis.getValue(`category-${categoryName}-${limit}-firstPage`);
            return res.json(categoryFistPage);
        }

        let menu = await Menu.findOne()
            .where('isTrashed').equals(false)
            .where('categoryName').equals(categoryName)
            .where('status').equals('OPEN')
            .execAsync();

        // 如果連選單的資料都查不到，直接噴給他空的
        if(!menu || !menu._id) {
            throw new Error('11001');
        }

        let newsListCursor = News.find();
        let newsTotalCursor = News.find();

        if(menu.level === 0) {
            newsListCursor.where('MainMenu').equals(menu._id);
            newsTotalCursor.where('MainMenu').equals(menu._id);
        }

        if(type) {
            newsListCursor.where('type').equals(type);
            newsTotalCursor.where('type').equals(type);
        }

        if(menu.level === 1) {
            newsListCursor.where('Menus').equals(menu._id);
            newsTotalCursor.where('Menus').equals(menu._id);
        }

        newsListCursor
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now());
        newsTotalCursor
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now());

        let [ newsList, total ] = await Promise.all([
            newsListCursor
                .populate('MainMenu MainPhoto MainVideo')
                .select('sn title shortTitle MainMenu MainPhoto MainVideo type startedAt')
                .limit(limit)
                .skip(skip)
                .sort('-startedAt')
                .execAsync(),
            newsTotalCursor.limit(1000).countAsync()
        ]);

        // 處理分頁
        debug('total = %d', total);
        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            newsList,
            pageData,
            menu
        });
    } catch (err) {
        return next(err);
    }
};
