/*
 * query 條件已經下過 index 了
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:rss:subList');

import _ from 'lodash';
import moment from 'moment-timezone';
import { News,Menu } from '../../../models';

module.exports = async(req, res, next) => {

    let { limit, start, end } = req.query;
    let { feedFrom } = req.params;
    const feedFromList = ['BOBEENOW', 'IFUNNOW', 'PETSMAO', 'PINKNOW', 'PLAYNOW', 'SIGHT', 'SPORTNOW'];

    // 驗證 query 的值
    if (_.isNaN(parseInt(limit, 10))) limit = 10;
    if (!moment(start).isValid()) start = null;
    if (!moment(end).isValid()) end = null;

    try {
            if (feedFromList.indexOf(feedFrom) === -1) {
                return res.send('Not find feed!');
            }

            let cursor = News.find();

            if (start) {
                start = moment.tz(start, 'Asia/Taipei');
                debug('startTime %s', start );
                cursor.where('startedAt').gte(start);
            }

            if (end) {
                end = moment.tz(end, 'Asia/Taipei');
                let now = moment.tz('Asia/Taipei');
                //篩除預發稿的新聞
                if(end.isAfter(now)){
                  end = now;
                }
                debug('endTime %s', end );
                cursor.where('startedAt').lte(end);
            }

            cursor
                .where('isDeliver').equals(false)
                .where('status').equals('RELEASE')
                .where('isTrashed').equals(false)
                .where('feedFrom').equals(feedFrom);

            let newsList = await cursor
                .populate('MainPhoto MainMenu Menus')
                .limit(parseInt(limit, 10))
                .sort('-startedAt')
                .execAsync();

            debug('共撈了 %d 新聞', newsList.length);

            return res.json(newsList);

        } catch (err) {

        return next(err);
    }

};
