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

        if(!news || !news.Tags || news.Tags.length === 0) {
            return Promise.resolve([]);
        }

        // 找出此新聞的相關新聞
        let relationNews = await News.find()
            .where('Tags').in(news.Tags)
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .where('sn').ne(sn)
            .where('startedAt').lte(Date.now())

            .populate([
                {
                    path: 'MainMenu',
                    select: '_id sn name'
                },
                {
                    path: 'MainPhoto',
                    select: '_id sn url height width desc title googleCDN thumbnail'
                }
            ])
            .select('_id sn title type startedAt MainPhoto MainMenu shortTitle')
            .sort('-startedAt')
            .limit(3)
            .execAsync();
        debug('relation News = %j', relationNews);

        return Promise.resolve(relationNews);
    } catch (err) {
        return Promise.reject(err);
    }
};
