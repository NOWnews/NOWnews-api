/*
 * 用 menuId 找尋某個分類的新聞列表
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:score:list');

import moment from 'moment-timezone';
import Promise from 'bluebird';

import { Menu, News } from '../../../models';
import { Pageview } from '../../../pvModels';
import _ from 'lodash';

module.exports = async (req, res, next) => {
    try {

        let { startedAt, endedAt, sort, menuId } = req.query;
        startedAt = startedAt ? moment.tz(startedAt, 'Asia/Taipei').startOf('day') : moment.tz('Asia/Taipei').startOf('day');
        endedAt = endedAt ? moment.tz(endedAt, 'Asia/Taipei').endOf('day') : moment.tz('Asia/Taipei').endOf('day');
        sort = sort || '-startedAt';

        debug('startedAt = %s', startedAt);
        debug('endedAt = %s', endedAt);

        // 找出某個分類裡面的新聞

        let cursor = News.find()
        let newsList = await News.find()
            .where('startedAt').gte(startedAt)
            .where('startedAt').lte(endedAt)
            .or([
                { MainMenu: menuId },
                { Menus: menuId }
            ])
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .sort(sort)
            .select('_id sn title shortTitle createdAt startedAt')
            .lean()
            .execAsync();

        debug('newsList = %j', newsList);
        let newsIds = _.map(newsList, (news) => { return news._id });
        let pageviews = await Pageview.aggregateAsync([
                         {
                             $match: {
                                 newsId: { $in: newsIds }
                             }
                         },
                         {
                             $group: {
                                 _id: '$newsId',
                                 sumPageviews: { $sum: '$pageviews' },
                                 sumWeightedScore: { $sum: '$weightedScore' },
                                 sumTotalScore: { $sum: '$totalScore' },
                                 sumTemperatures: { $sum: '$temperatures' }
                             }
                         }
                     ]);

        let sumMap = {};
        _.map(pageviews,(pv)=>{
            sumMap[pv._id] = {
                sumPageviews: pv.sumPageviews,
                sumWeightedScore: pv.sumWeightedScore,
                sumTotalScore: pv.sumTotalScore,
                sumTemperatures: pv.sumTemperatures
            };
        });

        newsList = _.map(newsList,(news)=>{
            news.originalPageviews = sumMap[news._id] ? sumMap[news._id].sumPageviews : 0 ;
            news.pageviews = sumMap[news._id] ? sumMap[news._id].sumPageviews + sumMap[news._id].sumTemperatures : 0 ;
            news.weightedScore = sumMap[news._id] ? sumMap[news._id].sumWeightedScore : 0 ;
            news.totalScore = sumMap[news._id] ? sumMap[news._id].sumTotalScore : 0 ;
            news.createdAt = moment.tz(news.createdAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm');
            return news;
        });

        return res.json( newsList );
    } catch(err) {
        return next(err);
    }
};
