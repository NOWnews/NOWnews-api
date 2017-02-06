
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:news:list');

import { News } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {

    let { limit, page, skip } = req.query;
    debug('req.query = %j', req.query);

    try {

        let newsList = await News.find()
            .where('isTrashed').equals(false)
            .populate('Author LastReviewer CreatedBy UpdatedBy')
            .limit(limit)
            .skip(skip)
            .execAsync();
        debug('news list = %j', newsList);

        // 處理分頁
        let total = await News.find()
            .where('isTrashed').equals(false)
            .countAsync();
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