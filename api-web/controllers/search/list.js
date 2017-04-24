
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:search:list');

import moment from 'moment-timezone';

import { News } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {
    try {

        const DEFAULT_TIME_TYPE_TO_MOMENT = {
            lastWeek: 'week',
            lastMonth: 'month',
            lastYear: 'year'
        };

        let { keyword } = req.params;
        let { limit, skip, page, startedAt, endedAt, timeRange } = req.query;
        let momentUnit = DEFAULT_TIME_TYPE_TO_MOMENT[timeRange];

        // 新聞相關的 cursor
        let cursor = News.find();
        let totalCursor = News.find();

        if (momentUnit) {
            startedAt = `${moment().subtract(1, momentUnit)} 00:00`;
            cursor.where('startedAt').lte(moment(startedAt));
            totalCursor.where('startedAt').lte(startedAt);
        } else {

            // 如果有開始時間，就以開始時間為主，沒有的話就以現在時間為主
            if(startedAt) {
                startedAt = `${moment(startedAt).format('YYYY-MM-DD')} 00:00`;
                cursor.where('startedAt').lte(moment(startedAt));
                totalCursor.where('startedAt').lte(startedAt);
            } else {
                cursor.where('startedAt').lte(Date.now());
                totalCursor.where('startedAt').lte(Date.now());
            }

            if (endedAt) {
                endedAt = `${moment(endedAt).format('YYYY-MM-DD')} 23:59`;
                cursor.where('startedAt').gte(endedAt);
                totalCursor.where('startedAt').gte(endedAt);
            }
        }


        // 找出相關列表與分頁資料
        let [ newsList, total ] = await Promise.all([
            cursor
                .or([
                    { title: new RegExp(keyword, 'i') },
                    { content: new RegExp(keyword, 'i') }
                ])
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .populate('MainPhoto MainVideo MainMenu')
                .limit(limit)
                .skip(skip)
                .select('sn title shortTitle MainPhoto type startedAt createdAt updatedAt')
                .sort('-createdAt')
                .execAsync(),
            totalCursor
                .or([
                    { title: new RegExp(keyword, 'i') },
                    { content: new RegExp(keyword, 'i') }
                ])
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .countAsync()
        ]);

        debug('news list = %j', newsList);

        // 處理分頁
        let pageData = pagination(total, limit, page, skip);

        return res.json({
            newsList,
            pageData
        });
    } catch (err) {
        return next(err);
    }
};
