/*
 * 用 menuId 找尋某個分類的新聞列表
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:score:list');

import moment from 'moment-timezone';
import Promise from 'bluebird';

import { Menu, News } from '../../../models';
import { Pageview } from '../../../pvModels';

module.exports = async (req, res, next) => {
    try {

        let { startedAt, endedAt, sort, menuId } = req.query;
        // startedAt = startedAt ? `${startedAt} 00:00` : `${moment().format('YYYY-MM-DD')} 00:00`;
        // endedAt = endedAt ? `${endedAt} 23:59` : `${moment().format('YYYY-MM-DD')} 23:59`;
        // sort = sort || '-startedAt';

        // 找出某個分類裡面的新聞
        let newsList = await News.find()
            // .where('isTrashed').equals(false)
            // .where('startedAt').gte(startedAt)
            // .where('startedAt').gte(endedAt)
            // .where('status').equals('RELEASE')
            .or([
                { MainMenu: menuId },
                { Menus: menuId }
            ])
            .sort(sort)
            .select('_id sn title shortTitle')
            .lean()
            .execAsync();

        debug('newsList = %j', newsList);

        // 用新聞 id 找出 pv
        let newsListWithPageviews = await Promise.mapSeries(newsList, (news) => {
            return Pageview.findOne()
                .where('newsId').equals(news._id)
                .then((pageviewData) => {

                    if (!pageviewData) {
                        news.originalPageviews = 0;
                        news.pageviews = 0;
                        news.weightedScore = 0;
                        news.totalScore = 0;
                        return Promise.resolve(news);
                    }
                    news.pageviews = pageviewData.pageviews + pageviewData.temperatures;
                    news.originalPageviews = pageviewData.pageviews;
                    news.weightedScore = pageviewData.weightedScore;
                    news.totalScore = pageviewData.totalScore;
                    return Promise.resolve(news);
                });
        });

        return res.json( newsListWithPageviews );
    } catch(err) {
        return next(err);
    }
};
