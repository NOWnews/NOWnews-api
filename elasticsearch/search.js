import Debug from 'debug';
const debug = Debug('NOWnews-api:elasticsearch:search');
import Promise from 'bluebird';
import client from './client';

module.exports = async (params) => {
    try {
        const result = await client.search(params);
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
};