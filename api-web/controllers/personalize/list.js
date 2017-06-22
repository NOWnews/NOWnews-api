
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:personalize:list');

import Promise from 'bluebird';
import _ from 'lodash';

import { Personalize } from '../../../pvModels';
import { News } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { cookie, userId, limit } = req.query;
        debug('req.query = %j', req.query);

        // 沒帶入其中一樣就回傳空陣列
        if(!cookie && !userId) {
            return res.json([]);
        }

        let [ dataByUser, dataByCookie ] = await Promise.all([
            Personalize.findOne()
                .where('userId').equals(userId)
                .sort('-createdAt')
                .execAsync(),
            Personalize.findOne()
                .where('cookie').equals(cookie)
                .sort('-createdAt')
                .execAsync(),
        ]);

        debug('dataByUser = %j', dataByUser);
        debug('dataByCookie = %j', dataByCookie);

        // 找不到分析過後的資料，回傳隨機資料
        if(!dataByUser && !dataByCookie) {
            let total = await News.find()
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .countAsync();
            let randomSkip = Math.floor(Math.random() * total);
            let randomNews = await News.find()
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .populate('MainMenu Menus MainPhoto MainVideo')
                .select('sn _id title shortTitle MainMenu MainPhoto startedAt type')
                .limit(limit)
                .skip(randomSkip)
                .execAsync();

            return res.json(randomNews);
        }

        // 參照資料，如果有 user 就用 user，沒有就用 cookie 的資料
        let refData = dataByUser || dataByCookie;

        let personalizeNews = [];

        if(refData.top1 && refData.top1.menuId && refData.top1.value) {
            let newsList = await News.find()
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .where('MainMenu').equals(refData.top1.menuId)
                .populate('MainMenu Menus MainPhoto MainVideo')
                .select('sn _id title shortTitle MainMenu MainPhoto startedAt type')
                .limit(Math.ceil(limit * refData.top1.value))
                .sort('-startedAt')
                .execAsync();

            personalizeNews = _.concat(personalizeNews, newsList);
        }

        if(refData.top2 && refData.top2.menuId && refData.top2.value ) {
            let newsList = await News.find()
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .where('MainMenu').equals(refData.top2.menuId)
                .populate('MainMenu Menus MainPhoto MainVideo')
                .select('sn _id title shortTitle MainMenu MainPhoto startedAt type')
                .limit(Math.ceil(limit * refData.top2.value))
                .sort('-startedAt')
                .execAsync();

            personalizeNews = _.concat(personalizeNews, newsList);
        }

        if(refData.top3 && refData.top3.menuId && refData.top3.value) {
            let newsList = await News.find()
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .where('MainMenu').equals(refData.top3.menuId)
                .populate('MainMenu Menus MainPhoto MainVideo')
                .select('sn _id title shortTitle MainMenu MainPhoto startedAt type')
                .limit(Math.ceil(limit * refData.top3.value))
                .sort('-startedAt')
                .execAsync();

            personalizeNews = _.concat(personalizeNews, newsList);
        }

        debug('personalizeNews = %j', personalizeNews);

        personalizeNews = _.shuffle(personalizeNews);

        return res.json(personalizeNews);
    } catch (err) {
        return next(err);
    }
};
