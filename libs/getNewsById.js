import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getNewsDataById');

import { News } from '../models';
import Promise from 'bluebird';

module.exports = async (id) => {
    try {

        // 找出主要新聞
        let news = await News.findById(id)
            .where('isTrashed').equals(false)
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
                    populate: { path: 'Avatar', select: '_id url' },
                    select: 'Avatar'
                }
            ])
            .select('_id sn title templateAD template Tags newsBy isSponsored isAdult traceCode type startedAt freeContent Photos content MainVideo MainPhoto Menus MainMenu summary shortTitle Author CreatedBy')
            .execAsync();
        debug('news = %j', news);

        return Promise.resolve(news);
    } catch (err) {
        return Promise.reject(err);
    }
};