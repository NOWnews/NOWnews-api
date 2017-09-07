/*
 * query 條件已經下過 index 了
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:instant:list');

import { pagination } from '../../../libs';
import { News } from '../../../models';
import redis from '../../../redis';

module.exports = async (req, res, next) => {
    try {

        let { limit, skip, page, type } = req.query;

        // 如果沒有 type 而且是第一頁，直接從 redis 拿資料
        if(!type && page === 1) {
            let instantPage1 = await redis.getValue(`instant-page1`);
            if(instantPage1){
                return res.json(instantPage1);
            }
        }
        let cursor = News.find();
        let totalCursor = News.find();

        if (type) {
            cursor.where('type').equals(type);
            totalCursor.where('type').equals(type);
        }

        // 新聞相關的 cursor
        cursor
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now())
            .where('isFeed').equals(false);
        totalCursor
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now())
            .where('isFeed').equals(false);

        // 找出相關列表與分頁資料
        let [ newsList, total ] = await Promise.all([
            cursor
                .populate([
                    {
                        path: 'MainMenu',
                        select: '_id sn name'
                    },
                    {
                        path: 'MainPhoto',
                        select: '_id sn url height desc width title googleCDN thumbnail'
                    },
                    {
                        path: 'MainVideo',
                        select: '_id url'
                    }
                ])
                .limit(limit)
                .skip(skip)
                .sort('-startedAt')
                .select('_id sn title shortTitle MainMenu MainPhoto MainVideo startedAt type')
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
