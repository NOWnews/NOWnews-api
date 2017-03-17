
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:indexPage:list');

import redis from '../../../redis';
import libs from '../../../libs';

module.exports = async (req, res, next) => {
    try {

        // 先進 redis 抓，看有沒有首頁資料
        let indexPageCache = await redis.getValue(`indexPage`);

        if(indexPageCache) {
            return res.json(indexPageCache);
        }

        // 如果 redis 沒有資料，去資料庫抓，再存回 redis 裡面
        let indexPage = await libs.getIndexPage();
        let cacheData = await redis.setValue(`indexPage`, indexPage);
        debug('cacheData = %j', cacheData);

        return res.json(indexPage);
    } catch (err) {
        return next(err);
    }
};