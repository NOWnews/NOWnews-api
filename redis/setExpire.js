
import Debug from 'debug';
const debug = Debug('NOWnews-api:redis:setExpire');

import Promise from 'bluebird';

import client from './client';

module.exports = async (key, expire) => {
    try {
        await client.expireAsync(key, expire);
        return Promise.resolve(true);
    } catch (err) {
        return Promise.reject(err);
    }
};