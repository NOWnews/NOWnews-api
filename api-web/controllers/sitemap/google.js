import moment from 'moment-timezone';
import _ from 'lodash';
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:sitemap:google');
import Promise from 'bluebird';
import { News } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        let limit = 595;
        let newsList = await News.find()
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .select('startedAt sn')
                .limit(limit)
                .sort('-startedAt');

        let sitemapList = [];

        _.map(newsList,(news)=>{
            sitemapList.push(
                {
                    url:'http://m.nownews.com/news/'+news.sn,
                    changefreq: 'daily',
                    priority: 1,
                    lastmod: moment.tz(news.startedAt, 'Asia/Taipei').format('YYYY-MM-DD')
                }
            );
        });

        debug('sitemapList = %j', sitemapList);

        return res.json(sitemapList);
    }catch(err) {
        return next(err);
    }
};