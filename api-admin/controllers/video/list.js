
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:video:list');
import moment from 'moment-timezone';
import _ from 'lodash';

import { Video } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async(req, res, next) => {

    try{

        let { title, limit, page, skip, sort, startedAt, endedAt, keywords} = req.query;
        debug('req.query = %j', req.query);

        let cursor = Video.find();
        let totalCursor = Video.find(); // 處理分頁用的
        sort = sort ? sort : '-createdAt';

        // 這個條件很複雜，就是要鍵入不同的關鍵字，還可以模糊搜尋
        if(keywords && keywords !== '') {

            keywords = _.split(keywords, ',');

            let titleCondition = [];
            let descCondition = [];
            let keywordCondition = [];

            _.forEach(keywords, (keyword) => {
                titleCondition.push({ title: new RegExp(keyword, 'i')});
                descCondition.push({ desc: new RegExp(keyword, 'i')});
                keywordCondition.push({ keyword: new RegExp(keyword, 'i')});
            });

            cursor.or([
                { $and: titleCondition },
                { $and: descCondition },
                { $and: keywordCondition },
            ]);
            totalCursor.or([
                { $and: titleCondition },
                { $and: descCondition },
                { $and: keywordCondition },
            ]);
        }

        if (title) {
            cursor.where('title').equals(new RegExp(title, 'i'));
            totalCursor.where('title').equals(new RegExp(title, 'i'));
        }

        if(startedAt && endedAt) {
            cursor.where('createdAt').gte(moment(`${startedAt} 00:00`).tz('Asia/Taipei'));
            cursor.where('createdAt').lte(moment(`${endedAt} 23:59`).tz('Asia/Taipei'));
            totalCursor.where('createdAt').gte(moment(`${startedAt} 00:00`).tz('Asia/Taipei'));
            totalCursor.where('createdAt').lte(moment(`${endedAt} 23:59`).tz('Asia/Taipei'));
        }

        let [ videos, total ] = await Promise.all([
            cursor
                .where('isTrashed').equals(false)
                .populate('CreatedBy UpdatedBy')
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .execAsync(),
            totalCursor
                .where('isTrashed').equals(false)
                .countAsync()
        ]);
        debug('video list = %j', videos);

        // 處理分頁
        debug('total = %d', total);
        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            videos,
            pageData
        });
    } catch (err) {
        return next(err);
    };
};