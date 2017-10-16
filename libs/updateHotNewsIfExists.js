import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateOneCatHotNews');

import Promise from 'bluebird';
import moment from 'moment-timezone';
import _ from 'lodash';

import { News, Menu } from '../models';
import { Pageview } from '../pvModels';
import redis from '../redis';
import updateOneMenuHotNews from './updateOneMenuHotNews';

module.exports = async(news) => {
    try {
        // 檢查這筆新聞 有沒有在現有的熱門新聞內 有的話就更新那個分類的熱門新聞
        let menuIds = news.Menus.concat(news.MainMenu);
        let menus = await Menu.find()
            .where('_id').in(menuIds)
            .where('isTrashed').equals(false)
            .where('status').equals('OPEN')
            .where('isPermanented').equals(true)
            .where('isExternal').equals(false)
            .select('_id categoryName level template')
            .execAsync();

        _.forEach(menus, async (menu)=>{
            let oneMenuHotNews = await redis.getValue(`hotNews-${menu.categoryName}`);
            if( _.find( oneMenuHotNews, { 'id' : news.id }) ){
                updateOneMenuHotNews(menu);
            }
        });


    } catch (err) {
        return Promise.reject(err);
    }
};