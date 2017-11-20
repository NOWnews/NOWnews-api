import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:indexpage:hideCarousels');

import redis from '../../../redis';
import libs from '../../../libs';
import { IndexPage } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { hideCarousels, UpdatedHideBy } = req.body;

        let indexPage = await IndexPage.findIndexPageAsync();
        debug('indexPage = %j', indexPage);

        indexPage.set('hideCarousels', hideCarousels);
        indexPage.set('UpdatedHideBy', UpdatedHideBy);

        let updatedIndexPage = await indexPage.saveAsync();
        debug('update indexPage = %j', updatedIndexPage);

        // 將首頁資訊存入 redis
        // let cacheData = await libs.getIndexPage();
        // let cacheIndexPage = await redis.setValue('indexPage', cacheData);

        return res.json(updatedIndexPage);
    } catch (err) {
        return next(err);
    }
};