import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:tag:hot');

import { News } from '../../../models';
import redis from '../../../redis';

module.exports = async (req, res, next) => {
    try {

        let hotTags = await redis.getValue(`hotTags`);

        return res.json(hotTags);
    }catch(err) {
        return next(err);
    }
};