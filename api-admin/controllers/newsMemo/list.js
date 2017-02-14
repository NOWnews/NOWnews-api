
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:newsMemo:list');

import { NewsMemo } from '../../../models';

module.exports = async (req, res, next) => {

    let { News, sort } = req.query;

    try {

        sort = sort ? sort : '-createdAt';

        let cursor = NewsMemo.find()
            .where('isTrashed').equals(false)
            .sort(sort);

        if(News) {
            cursor.where('News').equals(News);
        }

        let memoList = await cursor
            .populate('CreatedBy')
            .execAsync();
        debug('news memo list = %j', memoList);

        return res.json(memoList);
    }catch(err) {
        return next(err);
    }
};