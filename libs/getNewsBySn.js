import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getNewsDataBySn');

import { News } from '../models';
import Promise from 'bluebird';

module.exports = async (sn) => {
    try {

        // 找出主要新聞
        let news = await News.findBySn(sn)
            .where('isTrashed').equals(false)
            .where('status').equals('RELEASE')
            .where('startedAt').lte(Date.now())
            .populate('MainMenu Menus MainPhoto MainVideo Photos Videos Tags')
            .execAsync();
        debug('news = %j', news);

        return Promise.resolve(news);
    } catch (err) {
        return Promise.reject(err);
    }
};