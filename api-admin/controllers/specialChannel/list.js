
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialChannel:list');

import _ from 'lodash';
import { SpecialChannel } from '../../../models';
import { pagination } from '../../../libs';
import { Pageview } from '../../../pvModels';

module.exports = async (req, res, next) => {
    try{

        let { title, limit, page, skip, select } = req.query;

        let cursor = SpecialChannel.find();
        let totalCursor = SpecialChannel.find();

        if (title) {
            cursor.where('title').equals(new RegExp(title, 'i'));
            totalCursor.where('title').equals(new RegExp(title, 'i'));
        }

        if (select) {
            cursor.select(select)
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

        // 加上 pv
        let newsUrl = [];
        specialChannels = _.map(specialChannels,(news)=>{
            newsUrl.push(`/channel/${news.sn}`);
            return news.toJSON();
        });

        let pageviews = await Pageview.aggregateAsync([
            {
                $match: {
                    url: { $in: newsUrl }
                }
            },
            {
                $group: {
                    _id: '$url',
                    sumPageviews: { $sum: '$pageviews' },
                }
            }
        ]);
        pageviews = _.keyBy(pageviews,(pv)=>{
            return pv._id;
        });
        specialChannels = _.map(specialChannels,(news)=>{
            news.pageviews = pageviews[`/channel/${news.sn}`] ? pageviews[`/channel/${news.sn}`].sumPageviews : 0;
            return news;
        });

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