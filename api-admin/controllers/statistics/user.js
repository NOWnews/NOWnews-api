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

        startedAt = startedAt ? moment(startedAt).tz('Asia/Taipei').format('YYYY-MM-DD') : moment(Date.now()).tz('Asia/Taipei').format('YYYY-MM-DD');
        endedAt = endedAt ? moment(endedAt).tz('Asia/Taipei').format('YYYY-MM-DD') : moment(Date.now()).tz('Asia/Taipei').format('YYYY-MM-DD');

        // 取得使用者資訊與其新聞列表
        let [ user, newsList ] = await Promise.all([
            User.findById(id).execAsync(),
            News.find()
                .where('isTrashed').equals(false)
                .where('CreatedBy').equals(id)
                .where('startedAt').gte(`${startedAt} 00:00`)
                .where('startedAt').lte(`${endedAt} 23:59`)
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
                status: news.status
            };
            return Pageview.findOne()
                .where('newsId').equals(news._id)
                .execAsync()
                .then((pageview) => {
                    data.pvTotal = pageview ? pageview.pageviews : 0;
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
