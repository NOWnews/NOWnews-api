
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:user:list');

import Promise from 'bluebird';

import { User } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {

    let { limit, page, skip } = req.query;
    debug('req.query = %j', req.query);

    try{

        let users = await User.find()
            .where('isTrashed').equals(false)
            .where('isInitUser').equals(false)
            .populate('Role Center Department')
            .limit(limit)
            .skip(skip)
            .select('-password')
            .sort('createdAt')
            .execAsync();
        debug('users = %j', users);

        // 處理分頁
        let total = await User.find()
            .where('isTrashed').equals(false)
            .countAsync();
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