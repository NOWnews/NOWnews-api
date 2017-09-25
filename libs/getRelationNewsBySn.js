import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getRelationNewsBySn');

import { News } from '../models';
import Promise from 'bluebird';
import _ from 'lodash';
import moment from 'moment-timezone';
module.exports = async(sn) => {
    try {
        /* 查詢相關新聞的規則：先查詢同分類且有相同關鍵字的新聞，若不足則補上同主分類最新的新聞 */
        const needNewsNumbers = 3;
        const gteTime = moment.tz('Asia/Taipei').add(-3, 'months');

        // 找出新聞的 Tags
        let news = await News.findBySn(sn)
            .select('Tags MainMenu')
            .execAsync();

        let cursor = News.find();

        if (!news) {
            return Promise.resolve([]);
        }
        if (news.Tags && news.Tags.length > 0) {
            cursor.where('Tags').in(news.Tags);
        }
        cursor
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .where('sn').ne(sn)
            .where('startedAt').lte(Date.now())
            .where('startedAt').gte(gteTime)
            .where('MainMenu').equals(news.MainMenu)
            .populate([{
                    path: 'MainMenu',
                    select: '_id sn name'
                },
                {
                    path: 'MainPhoto',
                    select: '_id sn url height width desc title googleCDN thumbnail'
                }
            ])
            .select('_id sn title type startedAt MainPhoto MainMenu shortTitle')
            .sort('-startedAt')
            .limit(needNewsNumbers);

        let relationNews = await cursor.execAsync();
        if (relationNews.length < needNewsNumbers) {

            let notInSnArray = _.map(relationNews, (news) => news.sn);
            notInSnArray.push(sn);
            
            let sameMainMenuNews = await News.find()
                .where('status').equals('RELEASE')
                .where('isTrashed').equals(false)
                .where('sn').nin(notInSnArray)
                .where('startedAt').lte(Date.now())
                .where('startedAt').gte(gteTime)
                .where('MainMenu').equals(news.MainMenu)
                .populate([{
                        path: 'MainMenu',
                        select: '_id sn name'
                    },
                    {
                        path: 'MainPhoto',
                        select: '_id sn url height width desc title googleCDN thumbnail'
                    }
                ])
                .select('_id sn title type startedAt MainPhoto MainMenu shortTitle')
                .sort('-startedAt')
                .limit(relationNews.length - needNewsNumbers);
            relationNews = relationNews.concat(sameMainMenuNews);
        }

        debug('relation News = %j', relationNews);

        return Promise.resolve(relationNews);
    } catch (err) {
        return Promise.reject(err);
    }
};