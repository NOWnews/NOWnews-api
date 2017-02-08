
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:news:release');

import { News } from '../../../models';
import { newsLog } from '../../../libs';

module.exports = async (req, res, next) => {
    try {

        let { title, content, Author, UpdatedBy } = req.body;
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
        if(UpdatedBy === news.CreatedBy + '') {
            throw new Error('16010');
        }

        news.set('title', title);
        news.set('content', content);
        news.set('Author', Author);
        news.set('UpdatedBy', UpdatedBy);
        news.set('status', 'RELEASE');

        // 處理發布時間問題
        let startedAt = req.body.startedAt ? req.body.startedAt : Date.now();
        news.set('startedAt', startedAt);

        if(req.body.shortTitle) {
            news.set('shortTitle', req.body.shortTitle);
        }

        if(req.body.summary) {
            news.set('summary', req.body.summary);
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

        if(req.body.location) {
            news.set('location', req.body.location);
        }

        if(req.body.Tags) {
            news.set('Tags', req.body.Tags);
        }

        let updatedNews = await news.saveAsync();
        debug('update news = %j', updatedNews);

        // 處理 log
        await newsLog(updatedNews, 'UPDATE');

        return res.json(updatedNews);
    }catch(err) {
        return next(err);
    }
};