import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:rss:list');
import _ from 'lodash';
import Promise from 'bluebird';

import {
    News,Menu
} from '../../../models';
import {
    pagination
} from '../../../libs';

module.exports = async(req, res, next) => {

    let { limit , categories , start , end } = req.query;
    if (categories) {
        categories = JSON.parse(categories);
    }

    try {
        debug('categories %j',categories);
        
        let mainMenus = await Menu.find({'level':[0]},'name').execAsync();
        let filteredMenus = mainMenus.filter(menu => categories.includes(menu.name))
        let objectIds = filteredMenus.map(menu => menu['_id'])

        debug('objectIds = %j',objectIds);
        
        let rssNeedNews = News.find();

        if(start){
            debug('start %j',start);
            rssNeedNews.where('createdAt').gte(new Date(parseInt(start, 10)));

        }
        if(end){
            debug('end %j',end);
            rssNeedNews.where('createdAt').lte(new Date(parseInt(end, 10)));
        }
        if(limit) {
            rssNeedNews
            .limit(limit);
        }

        if(categories) {
            rssNeedNews
            .where('isDeliver').equals(true)
            .where('MainMenu').in(objectIds);
        }

        rssNeedNews
            .populate('MainPhoto MainMenu Menus');

        let newsList = await rssNeedNews.execAsync();

        res.json(newsList);

        debug('newslist %j', newsList );

    }catch(err) {
        return next(err);
    }
};