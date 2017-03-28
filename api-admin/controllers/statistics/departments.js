import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:statistics:departments');

import _ from 'lodash';
import Promise from 'bluebird';
import moment from 'moment-timezone';

import { Department, User, News } from '../../../models';
import { Pageview } from '../../../pvModels';

module.exports = async (req, res, next) => {
    try {

        let { startedAt, endedAt } = req.query;
        let today = moment(Date.now()).format('YYYY-MM-DD');
        startedAt = startedAt || moment(`${today} 00:00`);
        endedAt = endedAt || moment(`${today} 23:59`);

        let departments = await Department.find()
            .where('isTrashed').equals(false)
            .select('_id name')
            .execAsync();
        debug('departments = %j', departments);

        let departmentsInfo = await Promise.map(departments, (department) => {

            let data = {};

            // 用 department 找出 user
            return User.find()
                .where('isTrashed').equals(false)
                .where('Department').equals(department._id)
                .select('_id')
                .execAsync()
                .then((docs) => {
                    let userIds = _.map(docs, (doc) => { return doc._id; });
                    return Promise.resolve(userIds);
                })
                .then((userIds) => {
                    // 用 user 找出某部門所有的 news
                    return News.find()
                        .where('isTrashed').equals(false)
                        .where('CreatedBy').in(userIds)
                        .where('startedAt').gte(startedAt)
                        .where('startedAt').lte(endedAt)
                        .select('_id')
                        .execAsync();
                })
                .then((newsList) => {
                    // 將資料儲存進 data
                    data.departmentId = department._id;
                    data.name = department.name;
                    data.newstotal = newsList.length;

                    // 用 news 去 pv db 裡面撈 pv 資料
                    let newsIds = _.map(newsList, (news) => { return news._id; });

                    return Pageview.find()
                        .where('newsId').in(newsIds)
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

        debug('departmentsInfo = %j', departmentsInfo);

        return res.json(departmentsInfo);
    } catch(err) {
        return next(err);
    }
};