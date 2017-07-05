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

        // 取得 user 新聞資料與 pageview
        let userNewsList = await Promise.map(newsList, (news) => {
            let data = {
                newsId: news._id,
                title: news.title,
                startedAt: news.formatStartedAt,
                url: news.parseUrl,
                status: news.status,
                pvTotal: 0
            };
            return Pageview.find()
                .where('newsId').in(news._id)
                .execAsync()
                .then((pageviewList) => {
                    _.map(pageviewList,(pv)=>{
                        data.pvTotal += pv.pageviews;
                    });
                    return Promise.resolve(data);
                });
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
