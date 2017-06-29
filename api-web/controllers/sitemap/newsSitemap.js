/*
 * query 條件已經下過 index 了
 */

import moment from 'moment-timezone';
import _ from 'lodash';
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:sitemap:google');
import Promise from 'bluebird';
import { News } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        let device = req.query.device;
        let newsList = await News.find()
            .where('startedAt').lte(Date.now())
            .where('startedAt').gte(moment.tz('Asia/Taipei').add('-3', 'day'))
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .select('startedAt sn title')
            .sort('-startedAt')
            .limit(1000);

        let sitemapList = _.map(newsList, (news) => {

            let url = device === 'desktop' ? `www.nownews.com${news.parseUrl}` : `m.nownews.com/news/${news.sn}`;
            let name = device === 'desktop' ? `NOWnews` : `NOWnews今日新聞`;

            // 濾掉 word 裡面奇怪的東西
            news.title = news.title.replace(/[\u200B-\u200D\uFEFF]/g,'');

            return {
                url: `https://${url}`,
                name: name,
                language: 'zh-tw',
                genres: 'PressRelease, UserGenerated',
                publication_date: moment.tz(news.startedAt, 'Asia/Taipei').format('YYYY-MM-DD'),
                title: news.title
            };
        });

        debug('sitemapList = %j', sitemapList);

        return res.json(sitemapList);
    }catch(err) {
        return next(err);
    }
};
