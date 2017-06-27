
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
        let cursor = News.find()
            .where('isTrashed').equals(false)
            .where('status').equals('RELEASE');
        let totalCursor = News.find()
            .where('isTrashed').equals(false)
            .where('status').equals('RELEASE');

        if (momentUnit) {
            startedAt = moment.tz('Asia/Taipei').subtract(1, momentUnit).startOf('day');
            cursor.where('startedAt').gte(startedAt);
            totalCursor.where('startedAt').gte(startedAt);
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
                .or([
                    { title: new RegExp(keyword, 'i') },
                    { content: new RegExp(keyword, 'i') }
                ])
                .populate('MainPhoto MainVideo MainMenu')
                .limit(limit)
                .skip(skip)
                .select('sn title shortTitle MainVideo MainPhoto MainMenu type startedAt')
                .sort('-startedAt')
                .execAsync(),
            totalCursor
                .or([
                    { title: new RegExp(keyword, 'i') },
                    { content: new RegExp(keyword, 'i') }
                ])
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
