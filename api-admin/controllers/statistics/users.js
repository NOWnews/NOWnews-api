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
        startedAt = startedAt ? moment.tz(startedAt, 'Asia/Taipei').startOf('day') : moment.tz('Asia/Taipei').startOf('day');
        endedAt = endedAt ? moment.tz(endedAt, 'Asia/Taipei').endOf('day') : moment.tz('Asia/Taipei').endOf('day');

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
                .where('CreatedBy').in(user._id)
                .where('isTrashed').equals(false)
                .where('startedAt').gte(startedAt)
                .where('startedAt').lte(endedAt)
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
                    return Pageview.aggregateAsync([
                        {
                            $match: {
                                newsId: { $in: newsIds }
                            }
                        },
                        {
                            $group: {
                                _id: 'all',
                                sumPageviews: { $sum: '$pageviews' },
                            }
                        }
                    ]);
                })
                .then((pageviews) => {
                    data.pvTotal = _.isEmpty(pageviews) ? 0 : pageviews[0].sumPageviews;
                    data.pvAverage = (data.newsTotal === 0) ? 0 : (data.pvTotal/data.newsTotal);
                    data.pvAverage = Math.round(data.pvAverage * 100) / 100; // 取小數點兩位數
                    return Promise.resolve(data);
                });
        });


        // 計算每天總量
        let todayTotal = 0;
        _.forEach(usersInfo, (user) => {
            todayTotal += user.pvTotal;
        });

        debug('usersInfo = %j', usersInfo);

        return res.json({
            centerId: center._id,
            center: center.name,
            users: usersInfo,
            todayTotal,
            startedAt,
            endedAt
        });

    } catch(err) {
        return next(err);
    }
};