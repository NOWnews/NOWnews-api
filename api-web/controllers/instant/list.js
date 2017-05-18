
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:instant:list');

import { pagination } from '../../../libs';
import { News } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { limit, skip, page, type } = req.query;

        // 新聞相關的 cursor
        let cursor = News.find();
        let totalCursor = News.find();

        if (type) {
            cursor.where('type').equals(type);
            totalCursor.where('type').equals(type);
        }

        // 找出相關列表與分頁資料
        let [ newsList, total ] = await Promise.all([
            cursor.where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .populate('MainMenu Menus MainPhoto MainVideo')
                .limit(limit)
                .skip(skip)
                .sort('-startedAt')
                .select('sn _id title shortTitle MainMenu MainPhoto MainVideo startedAt type')
                .execAsync(),
            totalCursor.where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .countAsync()
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
