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
                    data.pvTotal = pageviews[0] ? pageviews[0].sumPageviews : 0;
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