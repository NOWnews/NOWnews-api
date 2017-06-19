
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:news:review');

import { News } from '../../../models';
import { newsLog } from '../../../libs';
import redis from '../../../redis';
import moment from 'moment-timezone';

module.exports = async (req, res, next) => {
    try {

        let { title, content, newsBy, LastReviewer, Author, MainMenu, UpdatedBy } = req.body;
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

        // 取得原本上一則下一則新聞的資料，並移除 cache
        let nextAndPrev = await redis.getValue(`news${news.sn}NextAndPrev`);

        if(nextAndPrev && nextAndPrev.next) {
            redis.removeValue(`news${nextAndPrev.next.sn}NextAndPrev`);
        }

        if(nextAndPrev && nextAndPrev.prev) {
            redis.removeValue(`news${nextAndPrev.prev.sn}NextAndPrev`);
        }

        // 檢查 redis 是否有資料，將之下架
        await Promise.all([
            redis.removeValue(`news${news.sn}`),
            redis.removeValue(`relationNewsByNews${news.sn}`),
            redis.removeValue(`news${news.sn}NextAndPrev`)
        ]);

        // 如果狀態不為草稿或是送審中，應該要先回復成草稿才能送審
        if(news.status !== 'DRAFT' && news.status !== 'REVIEW') {
            throw new Error('16009');
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
            news.set('startedAt', moment(req.body.startedAt).tz('Asia/Taipei'));
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

        return res.json(updatedNews);
    }catch(err) {
        return next(err);
    }
};
