import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getNextNewsBySn');

import { News } from '../models';
import Promise from 'bluebird';

module.exports = async (sn) => {
    try {

        let [ nextNews ] = await News.find()
            .where('isTrashed').equals(false)
            .where('status').equals('RELEASE')
            .where('startedAt').lte(Date.now())
            .where('sn').gt(sn)
            .sort('sn')
            .limit(1)
            .execAsync();
        debug('next news = %j', nextNews);

        return Promise.resolve(nextNews);

    } catch (err) {
        return Promise.reject(err);
    }
};