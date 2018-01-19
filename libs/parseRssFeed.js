
import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:parseRssFeed');

import xml2json from 'xml2json';
import axios from 'axios';
import Promise from 'bluebird';

module.exports = async (feed) => {

    try {

        let rssData = await axios.get(feed)
            .then((response) => {
                return Promise.resolve(response.data);
            });
        // debug('rss data = %s', rssData);

        let jsonString = xml2json.toJson(rssData);
        // debug('rss data = %s', jsonString);

        let jsonData = JSON.parse(jsonString);

        return Promise.resolve(jsonData);
    } catch (err) {
        return Promise.reject(err);
    }
};
