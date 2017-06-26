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
            .where('isTrashed').equals(false)
            .where('status').equals('RELEASE')
            .where('startedAt').lte(Date.now())
            .where('startedAt').gte(moment.tz('Asia/Taipei').add('-3', 'day'))
            .select('startedAt sn')
            .sort('-startedAt');

        let sitemapList = _.map(newsList, (news) => {

            let url = device === 'desktop' ? `www.nownews.com${news.parseUrl}` : `m.nownews.com/news/${news.sn}`;

            return {
                url: `https://${url}`,
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