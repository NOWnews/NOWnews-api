import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getRelationNewsBySn');

import { News } from '../models';
import Promise from 'bluebird';

module.exports = async (sn) => {
    try {

        // 找出新聞的 Tags
        let { Tags } = await News.findBySn(sn)
            .select('Tags')
            .execAsync();

        // 找出此新聞的相關新聞
        let relationNews = await News.find()
            .where('isTrashed').equals(false)
            .where('status').equals('RELEASE')
            .where('startedAt').lte(Date.now())
            .where('Tags').in(Tags)
            .where('sn').ne(sn)
            .populate('MainMenu MainPhoto')
            .select('title shortTitle sn MainMenu MainPhoto')
            .limit(3)
            .execAsync();
        debug('relation News = %j', relationNews);

        return Promise.resolve(relationNews);
    } catch (err) {
        return Promise.reject(err);
    }
};