import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:statistics:centers');

import _ from 'lodash';
import Promise from 'bluebird';
import moment from 'moment-timezone';

import { Center, User, News } from '../../../models';
import { Pageview } from '../../../pvModels';

module.exports = async (req, res, next) => {
    try {

        let { startedAt, endedAt } = req.query;

        // 重新組成時間字串
        startedAt = startedAt ? moment(startedAt).format('YYYY-MM-DD') : moment(Date.now()).format('YYYY-MM-DD');
        endedAt = endedAt ? moment(endedAt).format('YYYY-MM-DD') : moment(Date.now()).format('YYYY-MM-DD');

        let centers = await Center.find()
            .where('isTrashed').equals(false)
            .select('_id name')
            .execAsync();
        debug('centers = %j', centers);

        let centersInfo = await Promise.map(centers, (center) => {

            let data = {};

            // 用 center 找出 user
            return User.find()
                .where('isTrashed').equals(false)
                .where('Center').equals(center._id)
                .select('_id')
                .execAsync()
                .then((docs) => {
                    let userIds = _.map(docs, (doc) => { return doc._id; });
                    return Promise.resolve(userIds);
                })
                .then((userIds) => {
                    // 用 user 找出某中心所有的 news
                    return News.find()
                        .where('isTrashed').equals(false)
                        .where('CreatedBy').in(userIds)
                        .where('startedAt').gte(moment(`${startedAt} 00:00`))
                        .where('startedAt').lte(`${endedAt} 23:59`)
                        .select('_id')
                        .execAsync();
                })
                .then((newsList) => {
                    // 將資料儲存進 data
                    data.centerId = center._id;
                    data.name = center.name;
                    data.newstotal = newsList.length;

                    // 組成某部門所有新聞的 ids
                    let newsIds = _.map(newsList, (news) => { return news._id; });
                    return Promise.resolve(newsIds);
                })
                .then((newsIds) => {
                    // 用 news 去 pv db 裡面撈 pv 資料
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

        debug('centersInfo = %j', centersInfo);

        return res.json({
            centersInfo,
            startedAt,
            endedAt
        });
    } catch(err) {
        return next(err);
    }
};