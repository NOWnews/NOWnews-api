import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:statistics:categories');

import _ from 'lodash';
import Promise from 'bluebird';
import moment from 'moment-timezone';

import { Menu, Center, User, News } from '../../../models';
import { Pageview } from '../../../pvModels';

module.exports = async(req, res, next) => {
    try {

        let { startedAt, endedAt, limit } = req.query;

        // 重新組成時間字串
        startedAt = startedAt ? moment.tz(startedAt, 'Asia/Taipei').startOf('day') : moment.tz('Asia/Taipei').startOf('day');
        endedAt = endedAt ? moment.tz(endedAt, 'Asia/Taipei').endOf('day') : moment.tz('Asia/Taipei').endOf('day');
        limit = limit ? limit : 50000;


        let mainMenus = await Menu.find()
            .where('isTrashed').equals(false)
            .where('level').equals(0)
            .select('_id name')
            .lean();
        let categoiresNewsInfo = [];

        for (let mainMenu of mainMenus) {
            let categoryNews = await News.find()
                .where('MainMenu').equals(mainMenu._id)
                .where('isTrashed').equals(false)
                .where('startedAt').gte(startedAt)
                .where('startedAt').lte(endedAt)
                .select('_id')
                .lean();
            let newsTotalNumber = categoryNews.length;

            let newsIds = _.map(categoryNews, (news) => {
                return news._id;
            });

            let pageviews = await Pageview.aggregateAsync([{
                    $match: {
                        newsId: {
                            $in: newsIds
                        }
                    }
                },
                {
                    $group: {
                        _id: 'all',
                        sumPageviews: {
                            $sum: '$pageviews'
                        },
                    }
                }
            ]);

            let pvTotal = _.isEmpty(pageviews) ? 0 : pageviews[0].sumPageviews;
            let pvAverage = (newsTotalNumber === 0 ? 0 : (pvTotal/newsTotalNumber)).toFixed(2);

            categoiresNewsInfo.push({
                name:mainMenu.name,
                newsTotalNumber,
                pvTotal,
                pvAverage
            })
        }
        let allCategoriesNewsTotalNumber = 0;
        let allCategoriesNewsTotalPageviews = 0;
        _.forEach(categoiresNewsInfo, ( categoryNews) => {
            allCategoriesNewsTotalNumber += categoryNews.newsTotalNumber;
            allCategoriesNewsTotalPageviews += categoryNews.pvTotal;
        });

        return res.json({
            categoiresNewsInfo,
            allCategoriesNewsTotalNumber,
            allCategoriesNewsTotalPageviews
        });
    } catch (err) {
        return next(err);
    }
};