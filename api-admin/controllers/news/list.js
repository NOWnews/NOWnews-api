
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:news:list');

import Promise from 'bluebird';

import { News } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {

    let { limit, page, skip, title, status, Author, CreatedBy, UpdatedBy, LastReviewer, sort } = req.query;
    debug('req.query = %j', req.query);

    try {

        let cursor = News.find();
        let totalCursor = News.find(); // 處理分頁用的
        sort = sort ? sort : '-createdAt';

        if(title) {
            cursor.where('title').equals(new RegExp(title, 'i'));
            totalCursor.where('title').equals(new RegExp(title, 'i'));
        }

        if(status) {
            cursor.where('status').equals(status);
            totalCursor.where('status').equals(status);
        }

        if(Author) {
            cursor.where('Author').equals(Author);
            totalCursor.where('Author').equals(Author);
        }

        if(CreatedBy) {
            cursor.where('CreatedBy').equals(CreatedBy);
            totalCursor.where('CreatedBy').equals(CreatedBy);
        }

        if(UpdatedBy) {
            cursor.where('UpdatedBy').equals(UpdatedBy);
            totalCursor.where('UpdatedBy').equals(UpdatedBy);
        }

        if(LastReviewer) {
            cursor.where('LastReviewer').equals(LastReviewer);
            totalCursor.where('LastReviewer').equals(LastReviewer);
        }

        let [ newsList, total ] = await Promise.all([
            cursor
                .where('isTrashed').equals(false)
                .populate('Author LastReviewer CreatedBy UpdatedBy')
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .execAsync(),
            totalCursor
                .where('isTrashed').equals(false)
                .countAsync()
        ]);
        debug('news list = %j', newsList);

        // 處理分頁
        debug('total = %d', total);
        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            newsList,
            pageData
        });
    }catch(err) {
        return next(err);
    }
};