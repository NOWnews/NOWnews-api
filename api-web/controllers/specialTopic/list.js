import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:specialtopics:list');

import Promise from 'bluebird';

import { SpecialTopic } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {
    try {

        let { limit, skip, page } = req.query;

        let cursor = SpecialTopic.find();
        let totalCursor = SpecialTopic.find();

        let [ specialTopics, total ] = await Promise.all([
            cursor
                .where('isTrashed').equals(false)
                .sort('-createdAt')
                .limit(limit)
                .skip(skip)
                .populate('MainPhoto Tag')
                .execAsync(),
            totalCursor
                .where('isTrashed').equals(false)
                .limit(100)
                .countAsync()
        ]);

        // 處理分頁
        let pageData = pagination(total, limit, page, skip);

        return res.json({
            specialTopics,
            pageData
        });
    }catch(err) {
        return next(err);
    }
};