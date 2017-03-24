import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:preview:one');

import redis from '../../../redis';

module.exports = async (req, res, next) => {
    try {
        let { redisKey } = req.params;

        let cacheData = await redis.getValue(redisKey);
        debug('cache data = %j', cacheData);

        return res.json(cacheData);
    }catch(err) {
        return next(err);
    }
};