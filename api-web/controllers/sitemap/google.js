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
            .select('startedAt sn')
            .sort('-startedAt');

        let sitemapList = _.map(newsList, (news) => {

            let url = device === 'desktop' ? `www.nownews.com${news.parseUrl}` : `m.nownews.com/news/${news.sn}`;

            return {
                url: `http://${url}`,
                changefreq: 'daily',
                priority: 1.0,
                lastmod: moment.tz(news.startedAt, 'Asia/Taipei').format('YYYY-MM-DD')
            };
        });

        debug('sitemapList = %j', sitemapList);

        return res.json(sitemapList);
    }catch(err) {
        return next(err);
    }
};