
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:tag:list');

import Promise from 'bluebird';

import { Tag } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {
    try{

        let { limit, page, skip, name } = req.query;
        debug('req.query = %j', req.query);

        let cursor = Tag.find()
            .where('isTrashed').equals(false);
        let totalCursor = Tag.find()
            .where('isTrashed').equals(false);

        if(name) {
            cursor.where('name').equals(new RegExp(name, 'i'));
            totalCursor.where('name').equals(new RegExp(name, 'i'));
        }

        let [ tags, total ] = await Promise.all([
            cursor.find()
                .limit(limit)
                .skip(skip)
                .populate('CreatedBy UpdatedBy')
                .execAsync(),
            totalCursor.countAsync()
        ]);

        // 處理分頁
        debug('total = %d', total);
        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            tags,
            pageData
        });
    } catch (err) {
        return next(err);
    };
};