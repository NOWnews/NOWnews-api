import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:news:one');

import redis from '../../../redis';
import libs from '../../../libs';
import { News } from '../../../models';
import { Pageview } from '../../../pvModels'

module.exports = async (req, res, next) => {

    try {

        let { sn } = req.params;

        let cacheNews = await redis.getValue(`news${sn}`);

        if(cacheNews) {
            //加上pageview的totalscore
            let pageView = await Pageview.findOne()
                .where('url').equals(cacheNews.parseUrl)
                .select('totalScore')
                .execAsync();

            cacheNews.pageView = pageView;
            return res.json(cacheNews);
        }

        // 要給 api web 使用的 news 資料
        let news = await libs.getNewsBySn(sn);
        debug('news data = %j', news);

        if(!news) {
            throw new Error('16003');
        }

        //加上pageview的totalscore
        let pageView = await Pageview.findOne()
            .where('url').equals(news.parseUrl)
            .select('totalScore')
            .execAsync();

        news = news.toObject();
        news.pageView = pageView;

        // 將這篇新聞存入 redis
        let cacheData = await redis.setValue(`news${sn}`, news, 3600 * 6);
        debug('cacheData = %j', cacheData);

        return res.json(news);
    }catch(err) {
        return next(err);
    }
};