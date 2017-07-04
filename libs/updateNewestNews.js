import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateNewestNews');

import _ from 'lodash';

import { News } from '../models';
import redis from '../redis';

module.exports = async () => {
    try {

        let newsList = await News.find()
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now())
            .limit(10)
            .sort('-startedAt')
            .execAsync();

        let results = _.map(newsList, (news) => {
            return `https://www.nownews.com${news.parseUrl}`;
        });
        debug('results = %j', results);

        await redis.setValue(`newestNewsList`, results);

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};