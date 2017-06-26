import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:rss:list');

import _ from 'lodash';
import moment from 'moment-timezone';
import { News,Menu } from '../../../models';

module.exports = async(req, res, next) => {

    let { limit, categories, start, end, sort } = req.query;

    try {
            categories = categories ? categories.split(',') : [];
            sort = sort || '-startedAt';

            debug('categories %j', categories);

            let mainMenus = await Menu.find()
                .where('isTrashed').equals(false)
                .where('level').equals(0)
                .where('name').in(categories)
                .select('_id')
                .execAsync();

            let objectIds = _.map(mainMenus, menu => { return menu['_id']; });

            debug('categories objectIds = %j', objectIds);

            let rssNeedNews = News.find();

            if (start) {
                start = moment.tz(start, 'Asia/Taipei');
                debug('startTime %s', start );
                rssNeedNews.where('startedAt').gte(start);

            }
            if (end) {
                end = moment.tz(end, 'Asia/Taipei');
                debug('endTime %s', end );
                rssNeedNews.where('startedAt').lte(end);
            }
            if (limit) {
                debug('limit %s', limit);
                rssNeedNews.limit(parseInt(limit,10));
            }

            if (categories) {
                rssNeedNews
                    .where('isDeliver').equals(true)
                    .where('MainMenu').in(objectIds);
            }

            rssNeedNews
                .sort(sort)
                .populate('MainPhoto MainMenu Menus')
                .where('status').equals('RELEASE');

            let newsList = await rssNeedNews.execAsync();

            debug('共撈了 %d 新聞', newsList.length);

            return res.json(newsList);

        } catch (err) {

        return next(err);
    }

};