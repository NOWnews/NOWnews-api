import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:rss:list');
import _ from 'lodash';
import moment from 'moment-timezone';
import { News,Menu } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async(req, res, next) => {

    let { limit, categories, start, end } = req.query;

    try {
            categories = categories?categories.split(','):[];
            start = moment(parseInt(start, 10));
            end = moment(parseInt(end, 10));

            debug('categories %j', categories);

            let mainMenus = await Menu.find({ 'level': 0 }, 'name').execAsync();
            let filteredMenus = _.filter(mainMenus, menu => { return categories.includes(menu.name); });
            let objectIds = _.map(filteredMenus, menu => { return menu['_id']; } );

            debug('categories objectIds = %j', objectIds);

            let rssNeedNews = News.find();

            if (start) {
                debug('startTime %s', start );
                rssNeedNews.where('createdAt').gte(start);

            }
            if (end) {
                debug('endTime %s', end );
                rssNeedNews.where('createdAt').lte(end);
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
                .populate('MainPhoto MainMenu Menus')
                .where('status').equals('RELEASE')
                .sort('-startedAt');

            let newsList = await rssNeedNews.execAsync();
            
            debug('共撈了 %d 新聞', newsList.length);

            return res.json(newsList);

               
        } catch (err) {

        return next(err);
    }



};