
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:preview:create');

import cryptoRandomString from 'crypto-random-string';

import redis from '../../../redis';
import { News } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.body;

        let news = await News.findById(id)
            .populate('Author LastReviewer CreatedBy UpdatedBy MainMenu Menus Tags MainPhoto MainVideo')
            .lean()
            .execAsync();
        debug('news = %j', news);

        if(!news) {
            throw new Error('16003');
        }

        let redisKey = `preview${cryptoRandomString(10)}`;

        let cacheData = await redis.setValue(redisKey, news, 5);

        return res.json({
            redisKey
        });
    }catch(err) {
        return next(err);
    }
};
