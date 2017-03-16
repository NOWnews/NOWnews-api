
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialChannel:list');

import { SpecialChannel } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {
    try{

        let { title, limit, page, skip } = req.query;

        let cursor = SpecialChannel.find();
        let totalCursor = SpecialChannel.find();

        if (title) {
            cursor.where('title').equals(new RegExp(title, 'i'));
            totalCursor.where('title').equals(new RegExp(title, 'i'));
        }

        let [ specialChannels, total ] = await Promise.all([
            cursor
                .where('isTrashed').equals(false)
                .populate('newsList MainPhoto CreatedBy UpdatedBy Tag')
                .sort('-createdAt')
                .execAsync(),
            totalCursor
                .where('isTrashed').equals(false)
                .countAsync()
        ]);
        debug('specialChannels list = %j', specialChannels);

        // 處理分頁
        debug('total = %d', total);
        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            specialChannels,
            pageData
        });
    } catch (err) {
        return next(err);
    };
};