
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:getNewsListBycategory:list');

import Promise from 'bluebird';

import { pagination } from '../../../libs';
import { News, Menu } from '../../../models';
import { Pageview, TemperatureLog } from '../../../pvModels';

module.exports = async (req, res, next) => {
    try {

        let { limit, page, skip } = req.query;
        let { categoryName, type } = req.params;

        let menu = await Menu.findOne()
            .where('categoryName').equals(categoryName)
            .execAsync();

        // 如果連選單的資料都查不到，直接噴給他空的
        if(!menu || !menu._id) {
            throw new Error('11001');
        }

        let newsListCursor = News.find()
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now())
            .where('status').equals('RELEASE')
            .or([
                { MainMenu: menu._id },
                { Menus: menu._id}
            ]);


        let newsTotalCursor = News.find()
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now())
            .where('status').equals('RELEASE')
            .or([
                { MainMenu: menu._id },
                { Menus: menu._id}
            ]);

        if(type) {
            newsListCursor.where('type').equals(type);
            newsTotalCursor.where('type').equals(type);
        }

        let [ newsList, total ] = await Promise.all([
            newsListCursor
                .populate('MainMenu MainPhoto MainVideo')
                .select('sn title shortTitle MainMenu MainPhoto MainVideo')
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
        //單一ID?
        console.log(newsIds,'L74');
        console.log(mappingNews,'L69')

        // newsList.forEach((news) => {
        //     mappingNews[news._id] = news
        //     pageviewList.forEach((pageview) => {
        //         if (pageview.newsId === news.id) {
        //             console.log(123);
        //         }
        //     })
        // })

        //找pageview DB的資料
        let pageviewList = await Pageview.find()
        .where('newsId').in(newsIds)
        .sort('-totalScore')
        .execAsync();

        //做map把新聞列表列出每一筆newsid跟pv與權重 最後組合的
        let pageviewsResult = pageviewList.map((pageview) => {
            let {newsId, temperatures, pageviews, weightedScore} = pageview;
            let pv =  temperatures + pageviews
            // mappingNews[news._id] = news
            let news = mappingNews[newsId];
            return {
                newsId,
                pv,
                weightedScore,
                ...news
            }
        })

        console.log(pageviewsResult,'L108');


        // 處理分頁
        debug('total = %d', total);
        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            newsList,
            pageData
        });
    } catch (err) {
        return next(err);
    }
};
