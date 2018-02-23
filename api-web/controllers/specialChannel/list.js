import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:specialChannel:list');

import Promise from 'bluebird';

import { SpecialChannel } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {
    try {

        let { limit, skip, page } = req.query;

        let cursor = SpecialChannel.find();
        let totalCursor = SpecialChannel.find();

        let [ specialChannels, total ] = await Promise.all([
            cursor
                .where('isTrashed').equals(false)
                .limit(limit)
                .skip(skip)
                .populate('MainPhoto Tag')
                .sort('-createdAt')
                .execAsync(),
            totalCursor
                .where('isTrashed').equals(false)
                .limit(1000)
                .countAsync()
        ]);

        // 處理分頁
        let pageData = pagination(total, limit, page, skip);

        return res.json({
            specialChannels,
            pageData
        });
    }catch(err) {
        return next(err);
    }
};