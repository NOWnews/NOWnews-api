import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:news:nextAndPrev');

import _ from 'lodash';

import redis from '../../../redis';
import libs from '../../../libs';
import { News } from '../../../models';

module.exports = async (req, res, next) => {

    try {

        let { sn } = req.params;

        let aliveCache = await redis.getValue(`news${sn}NextAndPrev`);

        if(aliveCache) {
            return res.json(aliveCache);
        }

        // 要給 api web 使用的 news 資料

        let currentNews = await News.findOne()
            .where('sn').equals(sn)
            .select('MainMenu startedAt')
            .lean();

        let [ prevNews, nextNews ] = await Promise.all([
            libs.getPrevNewsByNews(currentNews),
            libs.getNextNewsByNews(currentNews)
        ]);

        // 當有上下篇新聞的時候，過期時間設定長一點
        let expire = 300;
        if(prevNews && nextNews) {
            expire = 3600 * 5;
        }

        const next = nextNews && {
            sn: nextNews.sn,
            title: nextNews.title,
            shortTitle: nextNews.shortTitle,
            parseUrl: nextNews.parseUrl
        } || {};

        const prev = prevNews && {
            sn: prevNews.sn,
            title: prevNews.title,
            shortTitle: prevNews.shortTitle,
            parseUrl: prevNews.parseUrl
        } || {};
        

        // 將這篇新聞存入 redis
        let newCache = await redis.setValue(`news${sn}NextAndPrev`, {
            next,
            prev
        }, expire);
        debug('newCache = %j', newCache);

        return res.json(newCache);
    }catch(err) {
        return next(err);
    }
};