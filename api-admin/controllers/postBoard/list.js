
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:postBoard:list');

import Promise from 'bluebird';
import { PostBoard } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {


    try {

        let { sort, limit, page, skip} = req.query;
        debug('req.query = %j', req.query);

        sort = sort ? sort : '-createdAt';

        let cursor = PostBoard.find();
        let totalCursor = PostBoard.find();

        let [ postBoard, total ] = await Promise.all([
            cursor.find()
                .where('isTrashed').equals(false)
                .limit(limit)
                .skip(skip)
                .deepPopulate('CreatedBy.Avatar messages.User.Avatar')
                .sort(sort)
                .execAsync(),
            totalCursor
                .where('isTrashed').equals(false)
                .countAsync()
        ]);

        debug('post board list = %j', postBoard);

        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            postBoard,
            pageData
        });
    }catch(err) {
        return next(err);
    }
};
