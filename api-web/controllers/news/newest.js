import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:news:newest');

import redis from '../../../redis';

module.exports = async (req, res, next) => {

    try {
        let newestList = await redis.getValue('newestNewsList');
        debug('newestList = %j', newestList);

        if(!newestList) {
            newestList = [];
        }

        return res.json(newestList);
    }catch(err) {
        return next(err);
    }
};