
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:preview:create');

import cryptoRandomString from 'crypto-random-string';

import _ from 'lodash';
import redis from '../../../redis';
import { News } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let options = _.pick(req.body, [
            'title',
            'MainMenu',
            'newsBy',
            'MainPhoto',
            'MainVideo',
            'content',
            'Photos',
            'Videos',
            'type',
            'startedAt',
            'createdAt',
            'freeContent',
            'traceCode',
            'Tags',
        ]);

        let redisKey = `preview${cryptoRandomString(10)}`;

        let cacheData = await redis.setValue(redisKey, options, 300);

        return res.json({
            redisKey
        });
    }catch(err) {
        return next(err);
    }
};
