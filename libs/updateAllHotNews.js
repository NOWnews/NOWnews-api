import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateAllHotNews');

import Promise from 'bluebird';
import moment from 'moment-timezone';
import _ from 'lodash';

import { News, Menu } from '../models';
import { Pageview } from '../pvModels';
import redis from '../redis';

module.exports = async () => {
    try {
        console.log(`== Start Update All Hot News ==`);
        let menus = await Menu.find()
            .where('isTrashed').equals(false)
            .where('status').equals('OPEN')
            .where('isPermanented').equals(true)
            .where('isExternal').equals(false)
            .select('_id categoryName level template')
            .execAsync();

        await Promise.map(menus, (menu) => {

            // 專欄新聞撈到 3 年前，一般新聞撈 1 天前
            let defaultDays = menu.template === 'DEFAULT' ? -1 : -1095;

            let cursor = News.find();

            cursor
                .where('startedAt').lte(Date.now())
                .where('startedAt').gte(moment.tz('Asia/Taipei').add(defaultDays, 'day'));

            if(menu.level === 0) {
                cursor.where('MainMenu').equals(menu._id);
            }

            if(menu.level === 1) {
                cursor.where('Menus').equals(menu._id);
            }

            cursor
                .where('status').equals('RELEASE')
                .where('isTrashed').equals(false);

            return cursor
                .select('_id')
                .execAsync()
                .then((newsList) => {
                    console.log(`== Find ${menu.categoryName} ${newsList.length} news ==`);
                    let newsIds = _.map(newsList, (news) => { return news._id });
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
                                _id: '$newsId',
                                sum: { $sum: '$totalScore' }
                            }
                        },
                        {
                            $sort: {
                                sum: -1
                            }
                        },
                        {
                            $limit : 15
                        }
                    ]);
                })
                .then((pageviews) => {
                    return Promise.mapSeries(pageviews, (pageview) => {
                        return News.findById(pageview._id)
                            .populate('MainPhoto')
                            .select('_id sn title shortTitle MainPhoto')
                            .execAsync();
                    });
                })
                .then((hotNewsInMenu) => {
                    debug(`hotNews-${menu.categoryName} = %j`, hotNewsInMenu);
                    return redis.setValue(`hotNews-${menu.categoryName}`, hotNewsInMenu, 3600);
                });
        }, { concurrency: 5 });
        console.log(`== Finished Update All Hot News ==`);

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};
