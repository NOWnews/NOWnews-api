import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getRelationNewsBySn');

import { News } from '../models';
import Promise from 'bluebird';

module.exports = async (sn) => {
    try {

        // 找出新聞的 Tags
        let news = await News.findBySn(sn)
            .select('Tags')
            .execAsync();

        if(!news || !news.Tags) {
            return Promise.resolve([]);
        }

        // 找出此新聞的相關新聞
        let relationNews = await News.find()
            .where('isTrashed').equals(false)
            .where('status').equals('RELEASE')
            .where('startedAt').lte(Date.now())
            .where('Tags').in(news.Tags)
            .where('sn').ne(sn)
            .populate('MainMenu MainPhoto')
            .select('title shortTitle sn MainMenu MainPhoto type startedAt')
            .sort('-startedAt')
            .limit(3)
            .execAsync();
        debug('relation News = %j', relationNews);

        return Promise.resolve(relationNews);
    } catch (err) {
        return Promise.reject(err);
    }
};
