import moment from 'moment-timezone';
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:news:list');
import _ from 'lodash';
import Promise from 'bluebird';

import { NotificationLog } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {

    let { limit, page, skip, title, os, status, createdAt } = req.query;
    
    debug('req.query = %j', req.query);

    try {

        let cursor = NotificationLog.find();
        let totalCursor = NotificationLog.find(); // 處理分頁用的
        sort = sort ? sort : '-createdAt';

        if (createdAt) {
            cursor.where('createdAt').equals(new RegExp(createdAt, 'i'));
            totalCursor.where('createdAt').equals(new RegExp(createdAt, 'i'));
        }

        if (title) {
            cursor.where('title').equals(new RegExp(title, 'i'));
            totalCursor.where('title').equals(new RegExp(title, 'i'));
        }

        if (os) {
            cursor.where('os').equals(os);
            totalCursor.where('os').equals(os);
        }

        let [ notificationLogs, total ] = await Promise.all([
            cursor
                .populate('News CreatedBy')
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .execAsync(),
            totalCursor
                .limit(1000)
                .countAsync()
        ]);
        debug('notificationLogs = %j', notificationLogs);

        return res.json({
            notificationLogs,
            pageData
        });
    }catch(err) {
        return next(err);
    }
};
