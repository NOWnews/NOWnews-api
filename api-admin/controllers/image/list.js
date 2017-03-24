
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:image:list');

import Promise from 'bluebird';
import moment from 'moment-timezone';
import _ from 'lodash';

import { Image } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async(req, res, next) => {

    let { limit, page, skip, keywords, imageFrom, startedAt, endedAt, sort } = req.query;
    debug('req.query = %j', req.query);

    try{

        let cursor = Image.find().where('type').equals('NEWS');
        let totalCursor = Image.find().where('type').equals('NEWS'); // 處理分頁用的
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

        if(imageFrom) {
            cursor.where('imageFrom').equals(imageFrom);
            totalCursor.where('imageFrom').equals(imageFrom);
        }

        if(startedAt && endedAt) {
            cursor.where('createdAt').gte(moment(`${startedAt} 00:00`).tz('Asia/Taipei'));
            cursor.where('createdAt').lte(moment(`${endedAt} 23:59`).tz('Asia/Taipei'));
            totalCursor.where('createdAt').gte(moment(`${startedAt} 00:00`).tz('Asia/Taipei'));
            totalCursor.where('createdAt').lte(moment(`${endedAt} 23:59`).tz('Asia/Taipei'));
        }

        let [ images, total ] = await Promise.all([
            cursor
                .where('isTrashed').equals(false)
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .execAsync(),
            totalCursor
                .where('isTrashed').equals(false)
                .countAsync()
        ]);
        debug('image list = %j', images);

        // 處理分頁
        debug('total = %d', total);
        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            images,
            pageData
        });
    } catch (err) {
        return next(err);
    };
};