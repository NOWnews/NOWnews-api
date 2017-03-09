
import Debug from 'debug';
const debug = Debug('NOWnews-api:redis:getValue');

import is from 'is_js';
import Promise from 'bluebird';
import client from './client';

module.exports = async (key) => {
    try {
        let value = await client.getAsync(key);
        debug('value = %j', value);

        if(!value) {
            return Promise.resolve(null);
        }

        let valueObject = JSON.parse(value);
        return Promise.resolve(valueObject);
    } catch (err) {
        return Promise.reject(err);
    }
};