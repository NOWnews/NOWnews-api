
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:news:draft');

import { News } from '../../../models';
import { newsLog } from '../../../libs';

module.exports = async (req, res, next) => {
    try {

        let { UpdatedBy } = req.body;
        let { id } = req.params;

        let news = await News.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('news = %j', news);

        if(!news) {
            throw new Error('16003');
        }

        news.set('status', 'DRAFT');
        news.set('UpdatedBy', UpdatedBy);

        if(req.body.title) {
            news.set('title', req.body.title);
        }

        if(req.body.shortTitle) {
            news.set('shortTitle', req.body.shortTitle);
        }

        if(req.body.summary) {
            news.set('summary', req.body.summary);
        }

        if(req.body.MainMenu) {
            news.set('MainMenu', req.body.MainMenu);
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

        if(req.body.content) {
            news.set('content', req.body.content);
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

        if(req.body.Author) {
            news.set('Author', req.body.Author);
        }

        if(req.body.LastReviewer) {
            news.set('LastReviewer', req.body.LastReviewer);
        }

        if(req.body.Tags) {
            news.set('Tags', req.body.Tags);
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