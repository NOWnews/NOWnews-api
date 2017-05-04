
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:location:list');

import { pagination } from '../../../libs';
import { News } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        // 緯度 latitude，經度longitude
        let { lat, long, limit, page, skip } = req.query;

        let opts = {
            center: [long, lat],
            maxDistance: 10,
            spherical: true
        };

        let cursor = News.find()
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now())
            .where('status').equals('RELEASE')
            .where('location').near(opts);
        let totalCursor = News.find()
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now())
            .where('status').equals('RELEASE')
            .where('location').near(opts);

        let [ newsList, total ] = await Promise.all([
            cursor
                .populate('MainMenu MainPhoto MainVideo')
                .select('sn title shortTitle MainMenu MainPhoto MainVideo')
                .limit(limit)
                .skip(skip)
                .sort('-startedAt')
                .execAsync(),
            totalCursor.countAsync()
        ]);

        // 處理分頁
        debug('total = %d', total);
        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            newsList,
            pageData
        });
    } catch (err) {
        return next(err);
    }
};