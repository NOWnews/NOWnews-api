import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getPrevNewsBySn');

import { News } from '../models';
import Promise from 'bluebird';

module.exports = async (sn) => {
    try {

        let [ prevNews ] = await News.find()
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now())
            .where('sn').lt(sn)
            .sort('-sn')
            .limit(1)
            .execAsync();
        debug('prev news = %j', prevNews);

        return Promise.resolve(prevNews);
    } catch (err) {
        return Promise.reject(err);
    }
};