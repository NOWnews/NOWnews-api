
import Debug from 'debug';
const debug = Debug('NOWnews-api:redis:setValue');

import Promise from 'bluebird';
import config from 'config';

import client from './client';

module.exports = async (key, value, expire) => {
    try {

        let valueString = JSON.stringify(value);
        await client.setAsync(key, valueString);

        if(expire) {
            await client.expireAsync(key, expire);
        }

        return Promise.resolve(value);
    } catch (err) {
        return Promise.reject(err);
    }
};