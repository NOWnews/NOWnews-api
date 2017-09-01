
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:user:list');

import Promise from 'bluebird';

import { User } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {

    let { limit, page, skip, name, status, Role, sort, Center, Department } = req.query;
    debug('req.query = %j', req.query);

    try{

        let cursor = User.find();
        let totalCursor = User.find(); // 處理分頁用的
        sort = sort ? sort : 'staffId'

        if(name) {
            cursor.where('name').equals(new RegExp(name, 'i'));
            totalCursor.where('name').equals(new RegExp(name, 'i'));
        }

        if(status) {
            cursor.where('status').equals(status);
            totalCursor.where('status').equals(status);
        }

        if(Role) {
            cursor.where('Role').equals(Role);
            totalCursor.where('Role').equals(Role);
        }

        if(Center) {
            cursor.where('Center').equals(Center);
            totalCursor.where('Center').equals(Center);
        }

        if(Department) {
            cursor.where('Department').equals(Department);
            totalCursor.where('Department').equals(Department);
        }

        let [ users, total ] = await Promise.all([
            cursor
                .where('isTrashed').equals(false)
                .where('_id').ne('530000000000000000000001') //superuser不顯示
                .populate('Role Department Center')
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .select('-password')
                .execAsync(),
            totalCursor
                .where('isTrashed').equals(false)
                .where('_id').ne('530000000000000000000001') //superuser不顯示
                .countAsync()
        ]);
        debug('users = %j', users);

        // 處理分頁
        debug('total = %d', total);
        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            users,
            pageData
        });

    } catch (err) {
        return next(err);
    };
};
