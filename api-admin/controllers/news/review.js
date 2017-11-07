
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:news:review');

import { newsLog } from '../../../libs';
import redis from '../../../redis';
import moment from 'moment-timezone';
import libs from '../../../libs';

module.exports = async (req, res, next) => {
    try {

        let { title, content, newsBy, LastReviewer, Author, MainMenu, UpdatedBy } = req.body;
        let { id } = req.params;
        debug('req.body = %j', req.body);
        debug('req.params = %j', req.params);

        let news = await libs.getNewsById(id);

        debug('news = %j', news);

        if(!news) {
            throw new Error('16003');
        }

        // 已經release過的news改為review狀態時 為了防止存取單筆新聞 發生404 延長此新聞cache時間為一週
        if(news.status === "RELEASE" ){
            await  Promise.all([
                redis.setValue(`news${news.sn}`, news, 3600 * 24 * 7),
                redis.setExpire(`relationNewsByNews${news.sn}`, 3600 * 24 * 7),
                redis.setExpire(`news${news.sn}NextAndPrev`, 3600 * 24 * 7),
            ]);
        }

        news.set('MainMenu', MainMenu);
        news.set('title', title);
        news.set('content', content);
        news.set('newsBy', newsBy);
        news.set('LastReviewer', LastReviewer);
        news.set('Author', Author);
        news.set('UpdatedBy', UpdatedBy);
        news.set('status', 'REVIEW');

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

        if(req.body.startedAt) {
            news.set('startedAt', req.body.startedAt);
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

        if(req.body.template) {
            news.set('template', req.body.template);
        }

        if(req.body.templateAD) {
            news.set('templateAD', req.body.templateAD);
        }
        let updatedNews = await news.saveAsync();
        debug('update news = %j', updatedNews);

        // 處理 log
        updatedNews = await updatedNews.populate('MainMenu Menus MainPhoto MainVideo Photos Videos Author Tags LastReviewer CreatedBy UpdatedBy').execPopulate();
        await newsLog(updatedNews, 'UPDATE');

        return res.json(updatedNews);
    }catch(err) {
        return next(err);
    }
};
