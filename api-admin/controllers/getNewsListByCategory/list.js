
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:getNewsListBycategory:list');

import Promise from 'bluebird';

import { pagination } from '../../../libs';
import { News, Menu } from '../../../models';
import { Pageview, TemperatureLog } from '../../../pvModels';

module.exports = async (req, res, next) => {
    try {

        let { limit, page, skip } = req.query;
        let { categoryId } = req.params;

        let newsListCursor = News.find()
            .where('isTrashed').equals(false)
            // .where('startedAt').lte(Date.now())
            // .where('status').equals('RELEASE')
            .or([
                { MainMenu: categoryId },
                { Menus: categoryId}
            ]);


        let newsTotalCursor = News.find()
            .where('isTrashed').equals(false)
            // .where('startedAt').lte(Date.now())
            // .where('status').equals('RELEASE')
            .or([
                { MainMenu: categoryId },
                { Menus: categoryId}
            ]);

        let [ newsList, total ] = await Promise.all([
            newsListCursor
                .populate('MainMenu MainPhoto MainVideo')
                // .select('sn title shortTitle MainMenu MainPhoto MainVideo')
                .select('sn title shortTitle')
                .limit(limit)
                .skip(skip)
                .sort('-startedAt')
                .execAsync(),
            newsTotalCursor.countAsync()
        ]);

        //暫存新聞列表
        let mappingNews = {};

        let newsIds = newsList.map((news) => {
            //這是所有新聞
            mappingNews[news._id] = news
            return news._id
        })

        debug('mappingNews = %j', mappingNews);


        //找pageview DB的資料
        let pageviewList = await Pageview.find()
        .where('newsId').in(newsIds)
        .sort('-totalScore')
        .execAsync();

        debug('pageviewList = %j', pageviewList);

        //做map把新聞列表列出每一筆newsid跟pv與權重 最後組合的
        let pageviewsResult = pageviewList.map((pageview) => {
            let { newsId, temperatures, pageviews, weightedScore } = pageview;
            let pv =  temperatures + pageviews
            let { id, sn, title, shortTitle, formatCreatedAt, MainMenu } = mappingNews[newsId];
            return {
                newsId,
                pv,
                weightedScore,
                id,
                sn,
                title,
                shortTitle,
                formatCreatedAt,
                MainMenu
            }
        })

        // 處理分頁
        debug('total = %d', total);
        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            pageviewsResult,
            pageData
        });
    } catch (err) {
        return next(err);
    }
};
