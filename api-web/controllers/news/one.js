import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:news:one');

import redis from '../../../redis';
import { News } from '../../../models';

module.exports = async (req, res, next) => {

    try {

        let { sn } = req.params;

        let cacheNews = await redis.getValue(`news${sn}`);

        if(cacheNews) {
            return res.json(cacheNews);
        }

        let news = await News.findBySn(sn)
            .where('isTrashed').equals(false)
            .where('status').equals('RELEASE')
            .populate('MainMenu Menus MainPhoto MainVideo Photos Videos Author Tags LastReviewer CreatedBy UpdatedBy')
            .execAsync();
        debug('news = %j', news);

        if(!news) {
            throw new Error('16003');
        }

        // 將這篇新聞存入 redis
        let cacheData = await redis.setValue(`news${news.sn}`, news, 3600 * 6);
        debug('cacheData = %j', cacheData);

        return res.json(news);
    }catch(err) {
        return next(err);
    }
};