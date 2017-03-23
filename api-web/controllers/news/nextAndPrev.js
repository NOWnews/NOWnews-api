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
        let [ prevNews, nextNews ] = await Promise.all([
            libs.getPrevNewsBySn(sn),
            libs.getNextNewsBySn(sn)
        ]);

        // 將這篇新聞存入 redis
        let newCache = await redis.setValue(`news${sn}NextAndPrev`, {
            next: _.pick(nextNews, 'sn', 'title', 'shortTitle'),
            prev: _.pick(prevNews, 'sn', 'title', 'shortTitle')
        }, 3600 * 6)
        debug('newCache = %j', newCache);

        return res.json(newCache);
    }catch(err) {
        return next(err);
    }
};