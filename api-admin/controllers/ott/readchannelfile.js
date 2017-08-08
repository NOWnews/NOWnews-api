
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:create');

import Promise from 'bluebird';
import _ from 'lodash';

import fs from 'fs';

import redis from '../../../redis';
import { Menu } from '../../../models';

module.exports = async (req, res, next) => {

    try {
        let data = fs.readFileSync('files/channelfile.json', 'utf8');
        let jsonchanneldata = JSON.parse(data);

        // let cacheData = await redis.setValue(`channel`, options);
        // debug('cacheData = %j', cacheData);
        // return res.send(200);
        return res.json(jsonchanneldata);
    } catch (err) {
        return next(err);
    }
};
