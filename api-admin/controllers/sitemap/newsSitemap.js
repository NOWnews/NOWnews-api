import moment from 'moment';
import _ from 'lodash';
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:sitemap:google');
import Promise from 'bluebird';
import { News } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        let limit = 1275;
        let newsList = await News.find()
                .where('isTrashed').equals(false)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .select('createdAt sn title')
                .limit(limit)
                .sort('-startedAt');

        let sitemapList = [];
        _.map(newsList,(news)=>{
            sitemapList.push(
                {
                    url:'https://m.nownews.com/news/'+news.sn,
                    name: "NOWnews 今日新聞",
                    language: 'zh-tw',
                    genres: 'PressRelease, UserGenerated',
                    publication_date: moment(news.startedAt).format('YYYY-MM-DD'),
                    title: news.title
                }
            );
        });

        debug('sitemapList = %j', sitemapList);

        return res.json(sitemapList);
    }catch(err) {
        return next(err);
    }
};