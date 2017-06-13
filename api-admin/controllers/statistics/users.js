import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:statistics:users');

import _ from 'lodash';
import Promise from 'bluebird';
import moment from 'moment-timezone';

import { User, News, Center } from '../../../models';
import { Pageview } from '../../../pvModels';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;
        let { startedAt, endedAt } = req.query;

        // 重新組成時間字串
        startedAt = startedAt ? moment(startedAt).tz('Asia/Taipei').format('YYYY-MM-DD') : moment(Date.now()).tz('Asia/Taipei').format('YYYY-MM-DD');
        endedAt = endedAt ? moment(endedAt).tz('Asia/Taipei').format('YYYY-MM-DD') : moment(Date.now()).tz('Asia/Taipei').format('YYYY-MM-DD');

        let [ center, users ] = await Promise.all([
            Center.findById(id).execAsync(),
            User.find()
                .where('isTrashed').equals(false)
                .where('Center').equals(id)
                .select('_id name')
                .execAsync()
        ]);

        let usersInfo = await Promise.map(users, (user) => {

            let data = {};

            return News.find()
                .where('isTrashed').equals(false)
                .where('CreatedBy').in(user._id)
                .where('startedAt').gte(`${startedAt} 00:00`)
                .where('startedAt').lte(`${endedAt} 23:59`)
                .select('_id')
                .execAsync()
                .then((newsList) => {

                    data.userId = user._id;
                    data.name = user.name;
                    data.newsTotal = newsList.length;

                    let newsIds = _.map(newsList, (news) => { return news._id; });
                    return Promise.resolve(newsIds);
                })
                .then((newsIds) => {
                    return Pageview.find()
                        .where('newsId').in(newsIds)
                        .select('pageviews')
                        .execAsync();
                })
                .then((pageviews) => {
                    // 計算總 pv 並存入資料
                    let pv = 0;
                    for( let pageview of pageviews ) {
                        if(pageview && pageview.pageviews) { pv += pageview.pageviews; }
                    }

                    data.pvTotal = pv;
                    return Promise.resolve(data);
                });
        });
        debug('usersInfo = %j', usersInfo);

        return res.json({
            centerId: center._id,
            center: center.name,
            users: usersInfo,
            startedAt,
            endedAt
        });

    } catch(err) {
        return next(err);
    }
};