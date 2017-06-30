/*
 * query 條件已經下過 index 了
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:news:list');

import Promise from 'bluebird';
import _ from 'lodash';
import is from 'is_js';
import { News, Menu } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {
    try {

        let { mainMenus, author, menus, limit, skip, page } = req.query;

        let mainMenuSns = _.words(mainMenus);
        let menuSns = _.words(menus);
        debug('req query = %j', req.query);

        // 用 menu 的 sn 找出 menu 的 ObjectId
        let [ mainMenuIds, menuIds ] = await Promise.all([
            Menu.find()
                .where('sn').in(mainMenuSns)
                .execAsync()
                .then((docs) => {
                    let ids = _.map(docs, (doc) => {
                        return doc._id;
                    });
                    return Promise.resolve(ids);
                }),
            Menu.find()
                .where('sn').in(menuSns)
                .execAsync()
                .then((docs) => {
                    let ids = _.map(docs, (doc) => {
                        return doc._id;
                    });
                    return Promise.resolve(ids);
                }),
        ]);
        debug('MainMenu ids = %j', mainMenuIds);
        debug('Menu ids = %j', menuIds);

        let cursor = News.find();
        let totalCursor = News.find();


        if(author) {
            cursor.where('Author').equals(author);
            totalCursor.where('Author').equals(author);
        }

        // 如果有 MainMenu 或是有 Menus 的狀況
        if(mainMenus || menus) {
            cursor.or([
                { MainMenu: { $in: mainMenuIds }},
                { Menus: { $in: menuIds }}
            ]);
            totalCursor.or([
                { MainMenu: { $in: mainMenuIds }},
                { Menus: { $in: menuIds }}
            ]);
        }

        // if(menu.level === 0) {
        //     newsListCursor.where('MainMenu').equals(menu._id);
        //     newsTotalCursor.where('MainMenu').equals(menu._id);
        // }

        // if(menu.level === 1) {
        //     newsListCursor.where('Menus').equals(menu._id);
        //     newsTotalCursor.where('Menus').equals(menu._id);
        // }


        // 新聞相關的 cursor
        cursor
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now());
        totalCursor
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now());

        // 找出相關列表與分頁資料
        let [ newsList, total ] = await Promise.all([
            cursor.populate( ['MainMenu', 'Menus', 'MainPhoto', 'MainVideo',
                { path:'Author' ,  populate: { path: 'Avatar', select: 'url' }}] )
                .select('sn _id title shortTitle MainMenu MainPhoto startedAt type Author')
                .limit(limit)
                .skip(skip)
                .sort('-startedAt')
                .execAsync(),
            totalCursor.limit(1000).countAsync()
        ]);
        debug('news list = %j', newsList);

        // 處理分頁
        let pageData = pagination(total, limit, page, skip);

        return res.json({
            newsList,
            pageData
        });
    }catch(err) {
        return next(err);
    }
};
