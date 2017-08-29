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
                { path:'specialTopics', select: 'title createdAt url'},
                { path:'specialChannels', select: 'title sn createdAt'}
            ])
            .lean()
            .execAsync();

        // 為每篇 news加上PV
        let newsIds = [];
        let newsUrl = [];

        let formatNews = (news) => {
            newsIds.push(news._id);
            // 後台連結跟時間
            news.completeUrl = `/news/${news._id}`;
            news.formatStartedAt = moment.tz(news.startedAt, 'Asia/Taipei').format('YYYYMMDD HH:mm');
            return news;
        };

        let formatTopic = (news) => {
            let desktopUrl = news.url;
            let mobileUrl = '/news/' + news.url.split('/').pop();
            newsUrl.push(desktopUrl);
            newsUrl.push(mobileUrl);
            // 後台連結跟時間
            news.completeUrl = `/topic/${news._id}`;
            news.formatStartedAt = moment.tz(news.createdAt, 'Asia/Taipei').format('YYYYMMDD HH:mm');
            return news;
        };

        let formatChannel = (news) => {
            let desktopUrl = `/channel/${news.sn}`;
            let mobileUrl = `/news/channel/${news.sn}`;
            newsUrl.push(desktopUrl);
            newsUrl.push(mobileUrl);
            // 後台連結跟時間
            news.completeUrl = `/specialchannel/${news._id}`;
            news.formatStartedAt = moment.tz(news.createdAt, 'Asia/Taipei').format('YYYYMMDD HH:mm');
            return news;
        };

        let setNewsPv = (news) => {
            let desktopUrl = `/channel/${news.sn}`;
            let mobileUrl = `/news/channel/${news.sn}`;
            news.pageviews = newsPageviews[news._id] ? newsPageviews[news._id].sumPageviews : 0;
            return news;
        };

        let setTopicPv = (news) => {
            let desktopUrl = news.url;
            let mobileUrl = '/news/' + news.url.split('/').pop();
            let desktopPv = pageviews[desktopUrl] ? pageviews[desktopUrl].sumPageviews : 0;
            let mobilePv = pageviews[mobileUrl] ? pageviews[mobileUrl].sumPageviews : 0
            news.pageviews = desktopPv + mobilePv;
            return news;
        };

        let setChannelPv = (news) => {
            let desktopUrl = `/channel/${news.sn}`;
            let mobileUrl = `/news/channel/${news.sn}`;
            let desktopPv = pageviews[desktopUrl] ? pageviews[desktopUrl].sumPageviews : 0;
            let mobilePv = pageviews[mobileUrl] ? pageviews[mobileUrl].sumPageviews : 0
            news.pageviews = desktopPv + mobilePv;
            return news;
        };

        indexPage.carousels = _.map(indexPage.carousels, formatNews);
        indexPage.videos = _.map(indexPage.videos, formatNews);
        indexPage.specialTopics = _.map(indexPage.specialTopics, formatTopic);
        indexPage.specialChannels = _.map(indexPage.specialChannels, formatChannel);

        let newsPageviews = await Pageview.aggregateAsync([
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

        newsPageviews = _.keyBy(newsPageviews, (pv) => {
            return pv._id;
        });

        pageviews = _.keyBy(pageviews, (pv) =>  {
            return pv._id;
        });

        indexPage.carousels = _.map(indexPage.carousels, setNewsPv);
        indexPage.videos = _.map(indexPage.videos, setNewsPv);
        indexPage.specialTopics = _.map(indexPage.specialTopics, setTopicPv);
        indexPage.specialChannels = _.map(indexPage.specialChannels, setChannelPv);

        return res.json(indexPage);
    } catch (err) {
        return next(err);
    }
};