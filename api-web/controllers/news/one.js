import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:news:one');

import redis from '../../../redis';
import libs from '../../../libs';
import { News } from '../../../models';
import { Pageview } from '../../../pvModels'
import _ from 'lodash';
import summerUniversiade from '../event/summerUniversiade';

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
            // TODO 為了世大運特別加的
            cacheNews = summerUniversiade(cacheNews);

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

        // TODO 為了世大運特別加的
        news = summerUniversiade(news);

        //加上pageview的totalscore
        let pageviewList = await Pageview.find()
            .where('newsId').in(news.id)
            .select('totalScore')
            .execAsync();
        for(let pv of pageviewList){
            news.pageView.totalScore += pv.totalScore;
        }
        // 將這篇新聞存入 redis
        let cacheData = await redis.setValue(`news${sn}`, news, 3600 * 6);
        debug('cacheData = %j', cacheData);

        return res.json(news);
    }catch(err) {
        return next(err);
    }
};