
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:trend:googleKeywords');

import Promise from 'bluebird';
import axios from 'axios';
import XMLparser from 'xml2json';
import _ from 'lodash';

module.exports = async (req, res, next) => {
    try {

        let keywordsXML = await axios.request({
                method: 'get',
                url: 'https://trends.google.com.tw/trends/hottrends/atom/feed?pn=p12',
                responseType: 'document'
            })
            .then((result) => {
                return Promise.resolve(result.data);
            });
        debug('googleTrendingXML = %s', keywordsXML);

        let keywordsJson = XMLparser.toJson(keywordsXML, {
            object: true
        });

        debug('rss.channel.item = %j', keywordsJson.rss.channel.item);
        let trendingKeywords = _.map(keywordsJson.rss.channel.item, (item) => {
            return {
                keyword: item.title,
                searchTimes: item['ht:approx_traffic']
            };
        });

        return res.send(trendingKeywords);
    } catch(err) {
        return next(err);
    }
};