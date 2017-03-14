import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:news:relations');

import redis from '../../../redis';
import libs from '../../../libs';
import { News } from '../../../models';

module.exports = async (req, res, next) => {

    try {

        let { sn } = req.params;

        let cacheRelationNews = await redis.getValue(`relationNewsByNews${sn}`);

        if(cacheRelationNews) {
            return res.json(cacheRelationNews);
        }

        // 找出相關新聞的資料
        let relationNews = await libs.getRelationNewsBySn(sn);
        debug('relation news = %j', relationNews);

        // 將這篇新聞存入 redis
        let cacheData = await redis.setValue(`relationNewsByNews${sn}`, relationNews, 300);
        debug('cacheData = %j', cacheData);

        return res.json(relationNews);
    }catch(err) {
        return next(err);
    }
};