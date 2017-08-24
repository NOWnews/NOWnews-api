
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:1kxun:entertainment');

import _ from 'lodash';
import moment from 'moment-timezone';

import { News } from '../../../models';

const entertainmentObjId = '560000000000000000000006';

module.exports = async (req, res, next) => {
    try {

        // 先將此端點關閉
        throw new Error('10001');

        let newsList = await News.find()
            .where('startedAt').lte(Date.now())
            .where('MainMenu').equals(entertainmentObjId)
            .where('isDeliver').equals(true)
            .where('status').equals('RELEASE')
            .where('isTrashed').equals(false)
            .sort('-startedAt')
            .populate('MainPhoto')
            .limit(50)
            .select('sn title shortTitle MainPhoto summary startedAt')
            .lean()
            .execAsync();

        // 整理相關資訊
        newsList = _.map(newsList, (news) => {
            return {
                title: news.title,
                shortTitle: news.shortTitle,
                MainPhoto: news.MainPhoto.url,
                summary: news.summary,
                startedAt: moment(news.startedAt).unix('x'),
                url: `https://www.nownews.com/news/${moment.tz(news.startedAt, 'Asia/Taipei').format('YYYYMMDD')}/${news.sn}`
            };
        });
        debug('news list = %j', newsList);

        return res.json(newsList);
    } catch (err) {
        return next(err);
    }
};