
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialTopic:list');

import _ from 'lodash';
import { SpecialTopic } from '../../../models';
import { pagination } from '../../../libs';
import { Pageview } from '../../../pvModels';

module.exports = async (req, res, next) => {
    try{

        let { title, limit, page, skip, select } = req.query;

        let cursor = SpecialTopic.find();
        let totalCursor = SpecialTopic.find();

        if (title) {
            cursor.where('title').equals(new RegExp(title, 'i'));
            totalCursor.where('title').equals(new RegExp(title, 'i'));
        }

        if (select) {
            cursor.select(select)
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

        // 加上 pv
        let newsUrl = [];
        specialTopics = _.map(specialTopics, (news) => {
            if (news.url) {
                let desktopUrl = news.url;
                let mobileUrl = '/news/' + news.url.split('/').pop();
                newsUrl.push(desktopUrl);
                newsUrl.push(mobileUrl);
            }
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
        pageviews = _.keyBy(pageviews, (pv) => {
            return pv._id;
        });
        specialTopics = _.map(specialTopics, (news) => {
            if (news.url) {
                let desktopUrl = news.url;
                let mobileUrl = '/news/' + news.url.split('/').pop();
                let desktopPv = pageviews[desktopUrl] ? pageviews[desktopUrl].sumPageviews : 0;
                let mobilePv = pageviews[mobileUrl] ? pageviews[mobileUrl].sumPageviews : 0
                news.pageviews = desktopPv + mobilePv;
            }
            return news;
        });

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