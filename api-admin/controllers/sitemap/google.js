import moment from 'moment';
import _ from 'lodash';
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:sitemap:google');
import Promise from 'bluebird';
import { News } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        let limit = 595;
        let newsList = await News.find()
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .select('createdAt sn')
                .limit(limit)
                .sort('-startedAt');

        let sitemapList = [];

        _.map(newsList,(news)=>{
            sitemapList.push(
                {
                    url:'http://m.nownews.com/news/'+news.sn,
                    changefreq: 'daily',
                    priority: 1,
                    lastmod: moment(news.updatedAt).format('YYYY-MM-DD')
                }
            );
        });

        debug('sitemapList = %j', sitemapList);

        return res.json(sitemapList);
    }catch(err) {
        return next(err);
    }
};