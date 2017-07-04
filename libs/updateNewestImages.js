import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateNewestImages');

import _ from 'lodash';
import moment from 'moment-timezone';

import { Image } from '../models';
import redis from '../redis';

const regexString = /https:\/\/imgapiv2.nownews.com\//;

module.exports = async () => {
    try {

        let images = await Image.find()
            .where('isTrashed').equals(false)
            .where('createdAt').gte(moment.tz('Asia/Taipei').add('-3', 'hours'))
            .where('createdAt').lte(Date.now())
            .sort('-createdAt')
            .execAsync();

        let results = [];

        _.forEach(images, (image) => {
            if(image.thumbnail.match(regexString) === null) {
                return;
            }
            results.push(image.thumbnail);
            return;
        });
        debug('results = %j', results);

        await redis.setValue(`newestImages`, results);

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};