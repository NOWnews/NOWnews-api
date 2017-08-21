import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getNewsDataBySn');

import { News } from '../models';
import Promise from 'bluebird';

module.exports = async (sn) => {
    try {

        // 找出主要新聞
        let news = await News.findBySn(sn)
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now())
            .populate([
                {
                    path: 'MainMenu',
                    select: '_id sn name url ParentId categoryName'
                },
                {
                    path: 'Menus',
                    select: '_id sn name url ParentId categoryName'
                },
                {
                    path: 'MainPhoto',
                    select: '_id sn url desc title googleCDN thumbnail'
                },
                {
                    path: 'MainVideo',
                    select: '_id sn url desc title'
                },
                {
                    path: 'Photos',
                    select: '_id sn url desc title googleCDN thumbnail'
                },
                {
                    path: 'Tags',
                    select: 'sn name'
                },
                {
                    path: 'Author',
                    populate: { path: 'Avatar', select: 'url' },
                    select: 'Avatar'
                }
            ])
            .select('_id sn title templateAD template Tags newsBy isSponsored isAdult traceCode type startedAt freeContent Photos content MainVideo MainPhoto Menus MainMenu summary shortTitle')
            .execAsync();
        debug('news = %j', news);

        return Promise.resolve(news);
    } catch (err) {
        return Promise.reject(err);
    }
};