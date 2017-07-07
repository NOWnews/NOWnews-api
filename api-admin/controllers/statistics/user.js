import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:statistics:user');

import _ from 'lodash';
import Promise from 'bluebird';
import moment from 'moment-timezone';

import { User, News } from '../../../models';
import { Pageview } from '../../../pvModels';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;
        let { startedAt, endedAt } = req.query;

        startedAt = startedAt ? moment.tz(startedAt, 'Asia/Taipei').startOf('day') : moment.tz('Asia/Taipei').startOf('day');
        endedAt = endedAt ? moment.tz(endedAt, 'Asia/Taipei').endOf('day') : moment.tz('Asia/Taipei').endOf('day');

        // 取得使用者資訊與其新聞列表
        let [ user, newsList ] = await Promise.all([
            User.findById(id).execAsync(),
            News.find()
                .where('CreatedBy').equals(id)
                .where('isTrashed').equals(false)
                .where('startedAt').gte(startedAt)
                .where('startedAt').lte(endedAt)
                .select('_id sn title startedAt formatStartedAt status')
                .execAsync()
        ]);
        let newsIds = _.map(newsList, (news) => { return news._id });
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
        pageviews = _.keyBy(pageviews,(pv)=>{
            return pv._id;
        });
        let userNewsList = _.map(newsList,(news)=>{
            let data = {
                newsId: news._id,
                title: news.title,
                startedAt: news.formatStartedAt,
                url: news.parseUrl,
                status: news.status,
                pvTotal: pageviews[news._id] ? pageviews[news._id].sumPageviews : 0
            };
            return data;
        });
        debug('userNewsList = %j', userNewsList);

        return res.json({
            userId: user._id,
            user: user.name,
            userNewsList,
            startedAt,
            endedAt
        });
    } catch(err) {
        return next(err);
    }
};
