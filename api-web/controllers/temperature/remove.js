import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:temperature:remove');

import Promise from 'bluebird';
import config from 'config';

import { Pageview, TemperatureLog } from '../../../pvModels';

module.exports = async (req, res, next) => {
    try {

        let { url, newsId, userId, menuId } = req.body;

        let log = await TemperatureLog.findOne()
            .where('userId').equals(userId)
            .where('newsId').equals(newsId)
            .sort('-createdAt')
            .execAsync();

        if(log && log.action === 'DISLIKE') {
            throw new Error('11003');
        }

        let [ pageview, temperatureLog ] = await Promise.all([
            Pageview.findOneAndUpdateAsync({
                    url
                }, {
                    $inc: { temperatures: -1 },
                    $set: { newsId, menuId }
                }, {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                }),
            TemperatureLog.createAsync({
                userId,
                newsId,
                menuId,
                action: 'DISLIKE'
            })
        ]);

        // 加權後重新計算總分數
        pageview.set('totalScore', pageview.pageviews * config.get('pageviewWeight.pageviews') + pageview.temperatures * config.get('pageviewWeight.temperatures') + pageview.weightedScore * config.get('pageviewWeight.weightedScore'));
        await pageview.saveAsync();

        return res.status(200).send();
    }catch(err) {
        return next(err);
    }
};