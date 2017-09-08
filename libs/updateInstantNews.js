import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateInstantNews');

import pagination from './pagination';
import { News, Menu } from '../models';
import redis from '../redis';

// import _ from 'lodash';

// import { News } from '../models';
// import redis from '../redis';

module.exports = async () => {
    try {
        // 之後這些參數要抽出來放在 config
        const limit = 9;
        const skip = 0;
        const page = 1;

        // 新聞相關的 cursor
        let cursor = News.find()
            .where('isTrashed').equals(false)
            .where('status').equals('RELEASE')
            .where('startedAt').lte(Date.now())
            .where('isFeed').equals(false);
        let totalCursor = News.find()
            .where('isTrashed').equals(false)
            .where('status').equals('RELEASE')
            .where('startedAt').lte(Date.now())
            .where('isFeed').equals(false);

        // 找出相關列表與分頁資料
        let [ newsList, total ] = await Promise.all([
            cursor
                .populate([
                    {
                        path: 'MainMenu',
                        select: '_id sn name'
                    },
                    {
                        path: 'MainPhoto',
                        select: '_id sn url height desc width title googleCDN thumbnail'
                    }
                ])
                .limit(limit)
                .skip(skip)
                .sort('-startedAt')
                .select('_id sn title shortTitle MainMenu MainPhoto startedAt type')
                .execAsync(),
            totalCursor.limit(1000).countAsync()
        ]);
        debug('news list = %j', newsList);

        // 處理分頁
        let pageData = pagination(total, limit, page, skip);

        await redis.setValue(`instant-page1`, {
            newsList,
            pageData
        }, 3600);

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};
