
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:menu:struction');

import redis from '../../../redis';
import { Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        // 先進 redis 抓，看有沒有 menu 資料
        let menuCache = await redis.getValue(`menu`);

        if(menuCache) {
            return res.json(menuCache);
        }

        // 如果 redis 沒有資料，去資料庫抓，再存回 redis 裡面
        let menu = await Menu.findWebStructionAsync();
        let cacheData = await redis.setValue(`menu`, menu);
        debug('cacheData = %j', cacheData);

        return res.json(menu);
    } catch (err) {
        return next(err);
    }
};