import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:indexpage:list');

import { IndexPage } from '../../../models';
import { Pageview } from '../../../pvModels';
import _ from 'lodash';
import moment from 'moment-timezone';

module.exports = async (req, res, next) => {
    try {

        let indexPage = await IndexPage.findOne()
            .populate([
                { path:'videos', select: 'title sn startedAt'},
                { path:'carousels', select: 'title sn startedAt'},
                { path:'specialTopics', select: 'title createdAt'},
                { path:'specialChannels', select: 'title sn createdAt'}
            ])
            .lean()
            .execAsync();

        // 為每篇 news加上PV
        let newsIds = [];

        let formatNews = (news) => {
            newsIds.push(news._id);
            // 後台連結跟時間
            news.completeUrl = `/news/${news._id}`;
            news.formatStartedAt = moment.tz(news.startedAt, 'Asia/Taipei').format('YYYYMMDD HH:MM');
            return news;
        };

        let formatTopic = (news) => {
            newsIds.push(news._id);
            // 後台連結跟時間
            news.completeUrl = `/topic/${news._id}`;
            news.formatStartedAt = moment.tz(news.createdAt, 'Asia/Taipei').format('YYYYMMDD HH:MM');
            return news;
        };

        let formatChannel = (news) => {
            newsIds.push(news._id);
            // 後台連結跟時間
            news.completeUrl = `/specialchannel/${news._id}`;
            news.formatStartedAt = moment.tz(news.createdAt, 'Asia/Taipei').format('YYYYMMDD HH:MM');
            return news;
        };

        let setNewsPv = (news) => {
            news.pageviews = pageviews[news._id] ? pageviews[news._id].sumPageviews : 0;
            return news;
        };

        indexPage.carousels = _.map(indexPage.carousels, formatNews);
        indexPage.videos = _.map(indexPage.videos, formatNews);
        indexPage.specialTopics = _.map(indexPage.specialTopics, formatTopic);
        indexPage.specialChannels = _.map(indexPage.specialChannels, formatChannel);

        let pageviews = await Pageview.aggregateAsync([
            {
                $match: {
                    newsId: { $in: newsIds }
                }
            },
            {
                $group: {
                    _id: '$newsId',
                    sumPageviews: { $sum: '$pageviews' },
                }
            }
        ]);
        pageviews = _.keyBy(pageviews, (pv)=>{
            return pv._id;
        });

        indexPage.carousels = _.map(indexPage.carousels, setNewsPv);
        indexPage.videos = _.map(indexPage.videos, setNewsPv);
        indexPage.specialTopics = _.map(indexPage.specialTopics, setNewsPv);
        indexPage.specialChannels = _.map(indexPage.specialChannels, setNewsPv);

        return res.json(indexPage);
    } catch (err) {
        return next(err);
    }
};