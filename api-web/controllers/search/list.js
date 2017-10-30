/*
 * query 條件已經下過 index 了
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:search:list');

import moment from 'moment-timezone';
import _ from 'lodash';

import { News } from '../../../models';
import search from '../../../searchModels';
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

        debug('keyword = %s', keyword);

        let cursor = search.News.find();
        let totalCursor = search.News.find();
        let dateNow = Date.now();

        cursor.or([
            { title: new RegExp(keyword, 'i') },
            { shortTitle: new RegExp(keyword, 'i') },
            { content: new RegExp(keyword, 'i') }
        ])
        .where('status').equals('RELEASE')
        .where('isTrashed').equals(false);

        totalCursor.or([
            { title: new RegExp(keyword, 'i') },
            { shortTitle: new RegExp(keyword, 'i') },
            { content: new RegExp(keyword, 'i') }
        ])
        .where('status').equals('RELEASE')
        .where('isTrashed').equals(false);

        if (momentUnit) {
            startedAt = moment.tz('Asia/Taipei').subtract(1, momentUnit).startOf('day');
            cursor.where('startedAt').gte(startedAt);
            totalCursor.where('startedAt').gte(startedAt);
            cursor.where('startedAt').lte(dateNow);
            totalCursor.where('startedAt').lte(dateNow);
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

            let momentEndedAt = moment.tz(endedAt, 'Asia/Taipei');
            if (endedAt && momentEndedAt.isAfter(dateNow)) {
                cursor.where('startedAt').lte(momentEndedAt);
                totalCursor.where('startedAt').lte(momentEndedAt);
            } else {
                cursor.where('startedAt').lte(dateNow);
                totalCursor.where('startedAt').lte(dateNow);
            }
        }

        let [ searchNewsList, searchTotal ] = await Promise.all([
            cursor
                .limit(limit)
                .skip(skip)
                .select('newsId newsSn')
                .sort('-startedAt')
                .execAsync(),
            totalCursor
                .limit(1000)
                .select('_id')
                .countAsync()
        ]);

        let searchNewsIds = _.map(searchNewsList, (news) => {
            return news.newsId;
        });

        let newsList = await News.find()
            .where('_id').in(searchNewsIds)
            .populate('MainPhoto MainVideo MainMenu')
            .select('sn title shortTitle MainVideo MainPhoto MainMenu type startedAt')
            .sort('-startedAt')
            .execAsync();

        // 處理分頁
        let pageData = pagination(searchTotal, limit, page, skip);

        return res.json({
            newsList,
            pageData
        });
    } catch (err) {
        return next(err);
    }
};
