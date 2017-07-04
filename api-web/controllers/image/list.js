import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:image:list');

import redis from '../../../redis';

module.exports = async (req, res, next) => {

    try {
        let images = await redis.getValue('newestImages');
        debug('images = %j', images);

        if(!images) {
            images = [];
        }

        return res.json(images);
    }catch(err) {
        return next(err);
    }
};