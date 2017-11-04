import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:news:one');

import redis from '../../../redis';
import libs from '../../../libs';
import { News } from '../../../models';
import { Pageview } from '../../../pvModels'
import _ from 'lodash';

module.exports = async (req, res, next) => {

    try {

        let { sn } = req.params;

        let cacheNews = await redis.getValue(`news${sn}`);
        if(cacheNews) {
            cacheNews.pageView = { totalScore : 0 };
            //加上pageview的totalscore
            let pageviewList = await Pageview.find()
                .where('newsId').in(cacheNews.id)
                .select('totalScore')
                .execAsync();
            for(let pv of pageviewList){
                cacheNews.pageView.totalScore += pv.totalScore;
            };

            return res.json(cacheNews);
        }

        // 要給 api web 使用的 news 資料
        let news = await libs.getNewsBySn(sn);
        debug('news data = %j', news);

        if(!news) {
            throw new Error('16003');
        }

        news = news.toJSON();
        news.pageView = { totalScore: 0 };

        // 目前 IOS App 沒辦法吃 imgapi 的圖
        news.content = news.content.replace(/http(?:s?):\/\/(?:imgapiv2\.|web\.|m\.)?nownews\.com\/(?:.+src=)/g, '');

        //加上pageview的totalscore
        let pageviewList = await Pageview.find()
            .where('newsId').in(news.id)
            .select('totalScore')
            .execAsync();
        for(let pv of pageviewList){
            news.pageView.totalScore += pv.totalScore;
        }

        // 新聞發布後，有錯字拉回去修改時狀態為送審，因此一定會有 pageView，藉此判斷
        if (news.status === 'REVIEW' && !news.pageView.totalScore) {
            throw new Error('16003');
        }

        // 文中廣告
        news.hasContentAd = news.template === 'DEFAULT';
        if (news.hasContentAd) {
            // 預計是兩百字，可是避免有其他 img、style css 等等，因此以 250 保險。
            // 4 = '</p>'.length
            const insertIndex = news.content.indexOf ('</p>', 250) + 4;
            news.contentAdIndex = insertIndex;
        }

        // 將這篇新聞存入 redis
        let cacheData = await redis.setValue(`news${sn}`, news, 3600 * 6);
        debug('cacheData = %j', cacheData);

        return res.json(news);
    }catch(err) {
        return next(err);
    }
};
