
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:news:release');

import _ from 'lodash';
import moment from 'moment-timezone';

import { News } from '../../../models';
import { newsLog } from '../../../libs';
import { Pageview } from '../../../pvModels';
import redis from '../../../redis';
import libs from '../../../libs';
import moment from 'moment-timezone';

module.exports = async (req, res, next) => {
    try {

        let { title, content, newsBy, Author, MainMenu, UpdatedBy } = req.body;
        let { id } = req.params;
        debug('req.body = %j', req.body);
        debug('req.params = %j', req.params);

        let news = await News.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('news = %j', news);

        if(!news) {
            throw new Error('16003');
        }

        // 發布的人不應該是自己，應該會是其他人
        // if(UpdatedBy === news.CreatedBy + '') {
        //     throw new Error('16010');
        // }

        news.set('MainMenu', MainMenu);
        news.set('title', title);
        news.set('content', content);
        news.set('newsBy', newsBy);
        news.set('Author', Author);
        news.set('UpdatedBy', UpdatedBy);
        news.set('status', 'RELEASE');

        // 處理發布時間問題
        let startedAt = req.body.startedAt ? moment(req.body.startedAt).tz('Asia/Taipei') : Date.now();
        news.set('startedAt', startedAt);

        if(req.body.shortTitle) {
            news.set('shortTitle', req.body.shortTitle);
        }

        if(req.body.summary) {
            news.set('summary', req.body.summary);
        }

        if(req.body.Menus) {
            news.set('Menus', req.body.Menus);
        }

        if(req.body.MainPhoto) {
            news.set('MainPhoto', req.body.MainPhoto);
        }

        if(req.body.MainVideo) {
            news.set('MainVideo', req.body.MainVideo);
        }

        if(req.body.Photos) {
            news.set('Photos', req.body.Photos);
        }

        if(req.body.Videos) {
            news.set('Videos', req.body.Videos);
        }

        if(req.body.freeContent) {
            news.set('freeContent', req.body.freeContent);
        }

        if(req.body.type) {
            news.set('type', req.body.type);
        }

        if(req.body.traceCode) {
            news.set('traceCode', req.body.traceCode);
        }

        let isAdult = req.body.isAdult === true ? true : false;
        news.set('isAdult', isAdult);

        let isDeliver = req.body.isDeliver === true ? true : false;
        news.set('isDeliver', isDeliver);

        let isSponsored = req.body.isSponsored === true ? true : false;
        news.set('isSponsored', isSponsored);

        if(req.body.location) {
            news.set('location', req.body.location);
        }

        if(req.body.Tags) {
            news.set('Tags', req.body.Tags);
        }

        let updatedNews = await news.saveAsync();
        debug('update news = %j', updatedNews);

        // 處理 log
        updatedNews = await updatedNews.populate('MainMenu Menus MainPhoto MainVideo Photos Videos Author Tags LastReviewer CreatedBy UpdatedBy').execPopulate();
        await newsLog(updatedNews, 'UPDATE');

        /*
         * 暫時先拿掉這個機制，
         */
        // 要給 api web 使用的資料
        // let [ newsData, relationNewsData, prevNews, nextNews ] = await Promise.all([
        //     libs.getNewsBySn(updatedNews.sn),
        //     libs.getRelationNewsBySn(updatedNews.sn),
        //     libs.getPrevNewsBySn(updatedNews.sn),
        //     libs.getNextNewsBySn(updatedNews.sn)
        // ]);

        // 將發佈的新聞，此新聞的相關新聞，上下篇新聞存入 redis
        // if(newsData) {
        //     await Promise.all([
        //         redis.setValue(`news${updatedNews.sn}`, newsData, 3600 * 6),
        //         redis.setValue(`relationNewsByNews${updatedNews.sn}`, relationNewsData, 300),
        //         redis.setValue(`news${updatedNews.sn}NextAndPrev`, {
        //             next: _.pick(nextNews, 'sn', 'title', 'shortTitle'),
        //             prev: _.pick(prevNews, 'sn', 'title', 'shortTitle')
        //         }, 3600 * 6)
        //     ]);
        // }

        // 初始化 pageview 資訊
        await Pageview.findOneAndUpdateAsync({
                url: `/news/${moment(updatedNews.startedAt).format('YYYYMMDD')}/${updatedNews.sn}`
            }, {
                $set: { newsId: updatedNews._id, menuId: updatedNews.MainMenu._id }
            }, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            });

        return res.json(updatedNews);
    }catch(err) {
        return next(err);
    }
};
