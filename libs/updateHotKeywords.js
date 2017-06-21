import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateHotKeywords');

import _ from 'lodash';

import { News } from '../models';
import redis from '../redis';

module.exports = async () => {
    try {

        let newsList = await News.find()
            .where('isTrashed').equals(false)
            .where('status').equals('RELEASE')
            .where('startedAt').lte(Date.now())
            .populate('Tags')
            .select('sn _id Tags')
            .limit(100)
            .sort('-startedAt')
            .execAsync();
        debug('newsList = %j', newsList);

        // 將新聞所有 tag 都拉出來
        let tags = [];
        _.forEach(newsList, (news) => {
            tags = _.concat(tags, news.Tags);
        });

        if(_.isEmpty(tags)) {
            return Promise.resolve({});
        }

        // 計算各個 tag 的總量
        let obj = {};
        _.forEach(tags, (tag) => {

            if(!tag || !tag.name) {
                return;
            }

            let name = tag.name;
            if(!obj[name] && tag.isTrashed !== true) {
                obj[name] = 1;
            }

            if(obj[name] && tag.isTrashed !== true) {
                obj[name] += 1;
            }
        });
        debug('obj = %j', obj);

        // 按照新聞 tag 數量做排序
        let sortedTags = _.keys(obj).sort((i,j) => {
            return obj[j] - obj[i];
        });
        debug('sortedTags = %j', sortedTags);

        // 只取前 10 名的 tag
        let hotTags = sortedTags.slice(0, 10);

        await redis.setValue(`hotTags`, hotTags);

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};