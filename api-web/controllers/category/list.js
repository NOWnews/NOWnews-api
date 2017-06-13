
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:category:list');

import Promise from 'bluebird';

import { pagination } from '../../../libs';
import { News, Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        let { limit, page, skip } = req.query;
        let { categoryName, type } = req.params;

        let menu = await Menu.findOne()
            .where('categoryName').equals(categoryName)
            .where('isTrashed').equals(false)
            .where('status').equals('OPEN')
            .execAsync();

        // 如果連選單的資料都查不到，直接噴給他空的
        if(!menu || !menu._id) {
            throw new Error('11001');
        }

        let newsListCursor = News.find()
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now())
            .where('status').equals('RELEASE')
            .or([
                { MainMenu: menu._id },
                { Menus: menu._id }
            ]);
        let newsTotalCursor = News.find()
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now())
            .where('status').equals('RELEASE')
            .or([
                { MainMenu: menu._id },
                { Menus: menu._id }
            ]);

        if(type) {
            newsListCursor.where('type').equals(type);
            newsTotalCursor.where('type').equals(type);
        }

        let [ newsList, total ] = await Promise.all([
            newsListCursor
                .populate('MainMenu MainPhoto MainVideo')
                .select('sn title shortTitle MainMenu MainPhoto MainVideo type startedAt')
                .limit(limit)
                .skip(skip)
                .sort('-startedAt')
                .execAsync(),
            newsTotalCursor.countAsync()
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
