import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:rss:list');

import _ from 'lodash';
import moment from 'moment-timezone';
import { News,Menu } from '../../../models';

module.exports = async(req, res, next) => {

    let { limit, categories, start, end } = req.query;

    try {
            categories = categories ? categories.split(',') : [];

            debug('categories %j', categories);

            let mainMenus = await Menu.find({ 'level': 0 }, 'name').execAsync();
            let filteredMenus = _.filter(mainMenus, menu => { return _.includes(categories, menu.name); });
            let objectIds = _.map(filteredMenus, menu => { return menu['_id']; });

            debug('categories objectIds = %j', objectIds);

            let rssNeedNews = News.find();

            if (start) {
                start = moment(start).tz('Asia/Taipei');
                debug('startTime %s', start );
                rssNeedNews.where('startedAt').gte(start);

            }
            if (end) {
                end = moment(end).tz('Asia/Taipei');
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

            rssNeedNews.populate('MainPhoto MainMenu Menus');

            let newsList = await rssNeedNews.execAsync();

            debug('共撈了 %d 新聞', newsList.length);

            return res.json(newsList);

        } catch (err) {

        return next(err);
    }

};