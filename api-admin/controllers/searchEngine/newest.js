/*
 * 給中文檢索資料庫用的資料端點
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:searchengine:newest');

import { News } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        let newsList = await News.find()
            .sort('-sn')
            .select('_id sn title shortTitle content createdAt updatedAt startedAt')
            .lean()
            .limit(1000)
            .execAsync();

        return res.json(newsList);
    }catch(err) {
        return next(err);
    }
};
