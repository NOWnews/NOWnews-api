/*
 * query 條件已經下過 index 了
 */

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

        let cursor = News.find();
        let totalCursor = News.find();

        cursor.or([
            { title: new RegExp(keyword, 'i') },
            { content: new RegExp(keyword, 'i') }
        ])
        .where('status').equals('RELEASE')
        .where('isTrashed').equals(false);

        totalCursor.or([
            { title: new RegExp(keyword, 'i') },
            { content: new RegExp(keyword, 'i') }
        ])
        .where('status').equals('RELEASE')
        .where('isTrashed').equals(false);

        if (momentUnit) {
            startedAt = moment.tz('Asia/Taipei').subtract(1, momentUnit).startOf('day');
            cursor.where('startedAt').gte(startedAt);
            totalCursor.where('startedAt').gte(startedAt);
            cursor.where('startedAt').lte(Date.now());
            totalCursor.where('startedAt').lte(Date.now());
        } else {

            // default StratedAt is today.
            if(startedAt) {
                startedAt = moment.tz(startedAt, 'Asia/Taipei').startOf('day');
                cursor.where('startedAt').gte(startedAt);
                totalCursor.where('startedAt').gte(startedAt);
            } else {
                const today = moment.tz('Asia/Taipei').startOf('day');
                cursor.where('startedAt').gte(today);
                totalCursor.where('startedAt').gte(today);
            }

            if (endedAt) {
                endedAt = moment.tz(endedAt, 'Asia/Taipei').endOf('day');
                cursor.where('startedAt').lte(endedAt);
                totalCursor.where('startedAt').lte(endedAt);
            }
        }


        // 找出相關列表與分頁資料
        let [ newsList, total ] = await Promise.all([
            cursor
                .populate('MainPhoto MainVideo MainMenu')
                .limit(limit)
                .skip(skip)
                .select('sn title shortTitle MainVideo MainPhoto MainMenu type startedAt')
                .sort('-startedAt')
                .execAsync(),
            totalCursor
                .limit(1000)
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
