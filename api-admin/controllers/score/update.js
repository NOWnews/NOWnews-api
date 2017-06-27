/*
 * 更新某個新聞的加權分數
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:score:update');

import config from 'config';

import { Pageview } from '../../../pvModels';
import { News } from '../../../models';
import { updateNotNewsByMenuId } from '../../../libs';
import redis from '../../../redis';

module.exports = async (req, res, next) => {
    try {

        let { newsId } = req.params;
        let { weightedScore } = req.body;
        weightedScore = weightedScore || 0;

        let updatedPageview = await Pageview.findOneAndUpdateAsync({
                newsId: newsId
            }, {
                $set: { weightedScore: weightedScore }
            }, {
                new: true
            });
        debug('updatedPageview = %j', updatedPageview);

        // 加權後重新計算總分數
        updatedPageview.set('totalScore', updatedPageview.pageviews * config.get('pageviewWeight.pageviews') + updatedPageview.temperatures * config.get('pageviewWeight.temperatures') + updatedPageview.weightedScore * config.get('pageviewWeight.weightedScore'));
        updatedPageview = await updatedPageview.saveAsync();

        let news = await News.findById(newsId)
            .populate('MainMenu')
            .execAsync();

        if(!news.MainMenu) {
            throw new Error('19006');
        }

        await updateNotNewsByMenuId(news.MainMenu._id);

        return res.json(updatedPageview);
    } catch(err) {
        return next(err);
    }
};
