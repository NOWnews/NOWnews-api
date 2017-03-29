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

        startedAt = startedAt ? moment(startedAt).format('YYYY-MM-DD') : moment(Date.now()).format('YYYY-MM-DD');
        endedAt = endedAt ? moment(endedAt).format('YYYY-MM-DD') : moment(Date.now()).format('YYYY-MM-DD');

        // 取得使用者資訊與其新聞列表
        let [ user, newsList ] = await Promise.all([
            User.findById(id).execAsync(),
            News.find()
                .where('isTrashed').equals(false)
                .where('CreatedBy').equals(id)
                .where('startedAt').gte(moment(`${startedAt} 00:00`))
                .where('startedAt').lte(`${endedAt} 23:59`)
                .select('_id title')
                .execAsync()
        ]);

        // 取得 user 新聞資料與 pageview
        let userInfo = await Promise.map(newsList, (news) => {
            let data = {
                newsId: news._id,
                title: news.title,
            };
            return Pageview.findOne()
                .where('newsId').equals(news._id)
                .execAsync()
                .then((pageview) => {
                    data.pvTotal = pageview ? pageview.pageviews : 0;
                    return Promise.resolve(data);
                });
        });
        debug('userInfo = %j', userInfo);

        return res.json({
            userId: user._id,
            user: user.name,
            newsList: userInfo
        });
    } catch(err) {
        return next(err);
    }
};