/*
 * query 條件已經下過 index 了
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:rss:list');

import _ from 'lodash';
import moment from 'moment-timezone';
import { News,Menu } from '../../../models';

module.exports = async(req, res, next) => {

    let { limit, categories, start, end, sort } = req.query;

    try {
            categories = categories ? categories.split(',') : [];

            debug('categories %j', categories);

            let mainMenus = await Menu.find()
                .where('isTrashed').equals(false)
                .where('level').equals(0)
                .where('name').in(categories)
                .select('_id')
                .execAsync();

            let objectIds = _.map(mainMenus, menu => { return menu['_id']; });

            debug('categories objectIds = %j', objectIds);

            let cursor = News.find();

            if (start) {
                start = moment.tz(start, 'Asia/Taipei');
                debug('startTime %s', start );
                cursor.where('startedAt').gte(start);
            }

            if (end) {
                end = moment.tz(end, 'Asia/Taipei');
                debug('endTime %s', end );
                cursor.where('startedAt').lte(end);
            }

            cursor
                .where('MainMenu').in(objectIds)
                .where('isDeliver').equals(true)
                .where('status').equals('RELEASE')
                .where('isTrashed').equals(false);

            let newsList = await cursor
                .populate('MainPhoto MainMenu Menus')
                .limit(limit)
                .sort('-startedAt')
                .execAsync();

            debug('共撈了 %d 新聞', newsList.length);

            return res.json(newsList);

        } catch (err) {

        return next(err);
    }

};