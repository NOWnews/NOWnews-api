import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getPrevNewsByNews');

import { News } from '../models';
import Promise from 'bluebird';

module.exports = async (news) => {
    try {
        let [ prevNews ] = await News.find()
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .where('startedAt').lt(news.startedAt)
            .where('MainMenu').equals(news.MainMenu)
            .sort('-startedAt')
            .limit(1)
            .execAsync();
        debug('prev news = %j', prevNews);

        return Promise.resolve(prevNews);
    } catch (err) {
        return Promise.reject(err);
    }
};