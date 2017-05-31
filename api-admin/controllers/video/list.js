
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:video:list');

import { Video } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async(req, res, next) => {

    try{

        let { title, limit, page, skip, sort} = req.query;
        debug('req.query = %j', req.query);

        let cursor = Video.find();
        let totalCursor = Video.find(); // 處理分頁用的
        sort = sort ? sort : '-createdAt';

        if (title) {
            cursor.where('title').equals(new RegExp(title, 'i'));
            totalCursor.where('title').equals(new RegExp(title, 'i'));
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