
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialTopic:list');

import { SpecialTopic } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {
    try{

        let { title, limit, page, skip } = req.query;

        let cursor = SpecialTopic.find();
        let totalCursor = SpecialTopic.find();

        if (title) {
            cursor.where('title').equals(new RegExp(title, 'i'));
            totalCursor.where('title').equals(new RegExp(title, 'i'));
        }

        let [ specialTopics, total ] = await Promise.all([
            cursor
                .where('isTrashed').equals(false)
                .populate('MainPhoto CreatedBy UpdatedBy Tag')
                .sort('-createdAt')
                .execAsync(),
            totalCursor
                .where('isTrashed').equals(false)
                .countAsync()
        ]);
        debug('specialTopic list = %j', specialTopics);

        // 處理分頁
        debug('total = %d', total);
        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            specialTopics,
            pageData
        });
    } catch (err) {
        return next(err);
    };
};