import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getNextNewsByNews');

import { News } from '../models';
import Promise from 'bluebird';

module.exports = async (news) => {
    try {
        let [ nextNews ] = await News.find()
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .where('startedAt').gt(news.startedAt)
            .where('startedAt').lte(Date.now())
            .where('MainMenu').equals(news.MainMenu)
            .select('shortTitle title sn parseUrl startedAt')
            .sort('startedAt')
            .limit(1)
            .execAsync();
        debug('next news = %j', nextNews);

        return Promise.resolve(nextNews);

    } catch (err) {
        return Promise.reject(err);
    }
};