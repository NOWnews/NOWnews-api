import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:pageview:update');

import _ from 'lodash';
import config from 'config';
import uaParser from 'ua-parser-js';
import device from 'device';
import platform from 'platform';
import Promise from 'bluebird';

import { Pageview, PageviewLog } from '../../../pvModels';

module.exports = async (req, res, next) => {
    try {

        // 都先回應正確，射後不理
        res.status(200).send();

        let userAgent = new uaParser(req.headers['user-agent']);

        let browser = platform.parse(userAgent.getUA()).name;

        let platformInfo = device(userAgent.getUA()).type;

        let options = _.pick(req.body, 'newsId', 'queryString', 'url', 'menuId', 'title', 'appPlatform', 'appView', 'cookie', 'userId' );

        let [ pageview, pageviewLog ] = await Promise.all([
            Pageview.findOneAndUpdateAsync({
                    url: options.url
                }, {
                    $inc: { pageviews: 1 },
                    $set: {
                        newsId: options.newsId,
                        menuId: options.menuId,
                        cookie: options.cookie,
                        userId: options.userId
                    }
                }, {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                }),
            PageviewLog.createAsync({
                url: options.url,
                queryString: options.queryString,
                menuId: options.menuId,
                cookie: options.cookie,
                userId: options.userId,
                title: options.title,
                userAgent: userAgent.getUA(),
                browser: browser || appView,
                platform: platformInfo || appPlatform
            })
        ]);

        // 加權後重新計算總分數
        pageview.set('totalScore', pageview.pageviews * config.get('pageviewWeight.pageviews') + pageview.temperatures * config.get('pageviewWeight.temperatures') + pageview.weightedScore * config.get('pageviewWeight.weightedScore'));
        await pageview.saveAsync();

        return next();
    }catch(err) {
        return next(err);
    }
};