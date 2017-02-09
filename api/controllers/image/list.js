
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:image:list');

import Promise from 'bluebird';

import { Image } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async(req, res, next) => {

    let { limit, page, skip, title, desc, startedAt, endedAt, sort } = req.query;
    debug('req.query = %j', req.query);

    try{

        let cursor = Image.find().where('type').equals('NEWS');
        let totalCursor = Image.find().where('type').equals('NEWS'); // 處理分頁用的
        sort = sort ? sort : '-createdAt';

        if(title) {
            cursor.where('title').equals(new RegExp(title, 'i'));
            totalCursor.where('title').equals(new RegExp(title, 'i'));
        }

        if(desc) {
            cursor.where('desc').equals(new RegExp(desc, 'i'));
            totalCursor.where('desc').equals(new RegExp(desc, 'i'));
        }

        if(startedAt && endedAt) {
            cursor.where('createdAt').gte(startedAt);
            cursor.where('createdAt').lte(endedAt);
            totalCursor.where('createdAt').gte(startedAt);
            totalCursor.where('createdAt').lte(endedAt);
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