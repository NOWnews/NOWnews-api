import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateAllHotNews');

import Promise from 'bluebird';
import moment from 'moment-timezone';
import _ from 'lodash';

import { News, Menu } from '../models';
import { Pageview } from '../pvModels';
import redis from '../redis';

module.exports = async() => {
    try {
        /* 熱門新聞抓取邏輯：
         * 先查該分類下一天內的所有新聞 依熱門程度(pageview.totalScore)排序
         * 如果一天內總數量不夠6篇(專欄11篇) 再去查該分類下最新的30篇新聞 依熱門排序 補上差額數量新聞
         */

        console.log(`== Start Update All Hot News ==`);
        let menus = await Menu.find()
            .where('isTrashed').equals(false)
            .where('status').equals('OPEN')
            .where('isPermanented').equals(true)
            .where('isExternal').equals(false)
            .select('_id categoryName level template')
            .execAsync();

        for (let menu of menus) {
            // 預設先抓取1天內的所有新聞
            let defaultDays = -1;
            // 一般版型需要6筆 專欄需要11筆 熱門新聞
            let needNewsNumbers = menu.template === 'DEFAULT' ? 6 : 11;

            let cursor = News.find();

            cursor
                .where('status').equals('RELEASE')
                .where('isTrashed').equals(false)
                .where('startedAt').lte(Date.now())
                .where('startedAt').gte(moment.tz('Asia/Taipei').add(defaultDays, 'day'))
                .select('_id sn title shortTitle MainPhoto')
                .populate('MainPhoto');

            if (menu.level === 0) {
                cursor.where('MainMenu').equals(menu._id);
            }

            if (menu.level === 1) {
                cursor.where('Menus').equals(menu._id);
            }


            let todayNewsListByMenu = await cursor.execAsync();
            let todayNewsIds = _.map(todayNewsListByMenu, (news) => {
                return news._id
            });
            let sortedNewsIds = await Pageview.aggregateAsync([{
                    $match: {
                        newsId: {
                            $in: todayNewsIds
                        }
                    }
                },
                {
                    $group: {
                        _id: '$newsId',
                        sum: {
                            $sum: '$totalScore'
                        }
                    }
                },
                {
                    $sort: {
                        sum: -1
                    }
                },
                {
                    $limit: needNewsNumbers
                }
            ]);
            sortedNewsIds = _.flatMap(sortedNewsIds, (news) => {
                return news._id.toString();
            });
            //把新聞依照totalScore做排序 越高排越前面
            let sortedNews = _.sortBy(todayNewsListByMenu, (news) => {
                let foundIndex = sortedNewsIds.indexOf(news._id.toString());
                return foundIndex === -1 ? 999999999 : foundIndex;
            });

            debug(`${ menu.categoryName } 分類 一天內的新聞有 ${sortedNews.length} 筆 `);

            // 如果一天內的新聞數量不夠就補足
            if (sortedNews.length < needNewsNumbers) {
                let needMoreNewsNumbers = needNewsNumbers - sortedNews.length;
                let latestNews = News.find()
                    .select('_id sn title shortTitle MainPhoto')
                    .where('status').equals('RELEASE')
                    .where('isTrashed').equals(false)
                    .where('startedAt').lte(Date.now())
                    .where('_id').nin(sortedNewsIds)
                    .sort('-startedAt')
                    .limit(30);

                if (menu.level === 0) {
                    latestNews.where('MainMenu').equals(menu._id);
                }

                if (menu.level === 1) {
                    latestNews.where('Menus').equals(menu._id);
                }
                latestNews = await latestNews;

                let latestNewsIds = _.map(latestNews, (news) => {
                    return news._id
                });

                let sortedLatestNewsIds = await Pageview.aggregateAsync([{
                        $match: {
                            newsId: {
                                $in: latestNewsIds
                            }
                        }
                    },
                    {
                        $group: {
                            _id: '$newsId',
                            sum: {
                                $sum: '$totalScore'
                            }
                        }
                    },
                    {
                        $sort: {
                            sum: -1
                        }
                    },
                    {
                        $limit: needMoreNewsNumbers
                    }
                ]);
                sortedLatestNewsIds = _.flatMap(sortedLatestNewsIds, (news) => {
                    return news._id.toString();
                });
                let sortedLatestNews = _.sortBy(latestNews, (news) => {
                    let foundIndex = sortedLatestNewsIds.indexOf(news._id.toString());
                    return foundIndex === -1 ? 999999999 : foundIndex;
                });

                sortedNews = sortedNews.concat(sortedLatestNews.splice(0, needMoreNewsNumbers));



            }

            debug(`hotNews-${menu.categoryName} = %j`, sortedNews);
            redis.setValue(`hotNews-${menu.categoryName}`, sortedNews, 3600);

        }
    } catch (err) {
        return Promise.reject(err);
    }
};