import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:statistics:users');

import _ from 'lodash';
import Promise from 'bluebird';
import moment from 'moment-timezone';

import { User, News, Department } from '../../../models';
import { Pageview } from '../../../pvModels';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;
        let { startedAt, endedAt } = req.query;

        // 重新組成時間字串
        startedAt = startedAt ? moment(startedAt).format('YYYY-MM-DD') : moment(Date.now()).format('YYYY-MM-DD');
        endedAt = endedAt ? moment(endedAt).format('YYYY-MM-DD') : moment(Date.now()).format('YYYY-MM-DD');

        let [ department, users ] = await Promise.all([
            Department.findById(id).execAsync(),
            User.find()
                .where('isTrashed').equals(false)
                .where('Department').equals(id)
                .select('_id name')
                .execAsync()
        ]);

        let usersInfo = await Promise.map(users, (user) => {

            let data = {};

            return News.find()
                .where('isTrashed').equals(false)
                .where('CreatedBy').in(user._id)
                .where('startedAt').gte(moment(`${startedAt} 00:00`))
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
                    for(pageview of pageviews) {
                        if(pageview && pageview.pageviews) { pv += 1; }
                    }

                    data.pvTotal = pv;
                    return Promise.resolve(data);
                });
        });
        debug('usersInfo = %j', usersInfo);

        return res.json({
            departmentId: department._id,
            department: department.name,
            users: usersInfo
        });

    } catch(err) {
        return next(err);
    }
};