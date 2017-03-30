
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:hot:list');

import libs from '../../../libs';
import redis from '../../../redis';

module.exports = async (req, res, next) => {
    try {

        let { menuSn } = req.params;

        // 抓 cache 裡面的資料，每半個小時 cronjob 更新一次
        let menuHotNewsCache = await redis.getValue(`hotNewsInMenu${menuSn}`);

        // 如果從 redis 裡面抓不到資料
        if(menuHotNewsCache === null) {
            menuHotNewsCache = [];
        }

        return res.json(menuHotNewsCache);
    } catch (err) {
        return next(err);
    }
};