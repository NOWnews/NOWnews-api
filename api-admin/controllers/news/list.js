import moment from 'moment-timezone';
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:news:list');
import _ from 'lodash';
import Promise from 'bluebird';

import { Pageview } from '../../../pvModels';
import { News } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {

    let { limit, page, skip, title, type, status, Author,
         CreatedBy, UpdatedBy, LastReviewer, sort, startedAt, endedAt, MainMenu, sn, isScheduled} = req.query;
    debug('req.query = %j', req.query);

    try {

        let cursor = News.find();
        let totalCursor = News.find(); // 處理分頁用的
        sort = sort ? sort : '-createdAt';

        if(title) {
            cursor.where('title').equals(new RegExp(title, 'i'));
            totalCursor.where('title').equals(new RegExp(title, 'i'));
        }

        if(type) {
            cursor.where('type').equals(type);
            totalCursor.where('type').equals(type);
        }

        if(status) {
            cursor.where('status').equals(status);
            totalCursor.where('status').equals(status);
        }

        if(Author) {
            cursor.where('Author').equals(Author);
            totalCursor.where('Author').equals(Author);
        }

        if(CreatedBy) {
            cursor.where('CreatedBy').equals(CreatedBy);
            totalCursor.where('CreatedBy').equals(CreatedBy);
        }

        if(UpdatedBy) {
            cursor.where('UpdatedBy').equals(UpdatedBy);
            totalCursor.where('UpdatedBy').equals(UpdatedBy);
        }

        if(LastReviewer) {
            cursor.where('LastReviewer').equals(LastReviewer);
            totalCursor.where('LastReviewer').equals(LastReviewer);
        }

        if(startedAt) {
            cursor.where('startedAt').gte(moment.tz(startedAt, 'Asia/Taipei').startOf('day'));
            totalCursor.where('startedAt').gte(moment.tz(startedAt, 'Asia/Taipei').startOf('day'));
        }

        if(endedAt){
            cursor.where('startedAt').lte(moment.tz(endedAt, 'Asia/Taipei').endOf('day'));
            totalCursor.where('startedAt').lte(moment.tz(endedAt, 'Asia/Taipei').endOf('day'));
        }

        if(MainMenu){
            cursor.where('MainMenu').equals(MainMenu);
            totalCursor.where('MainMenu').equals(MainMenu);
        }

        if(sn){
            cursor.where('sn').equals(sn);
            totalCursor.where('sn').equals(sn);
        }

        if(isScheduled === false || isScheduled === 'false') {
            cursor.where('startedAt').lte(Date.now());
            totalCursor.where('startedAt').lte(Date.now());
        }

        let [ newsList, total ] = await Promise.all([
            cursor
                .where('isTrashed').equals(false)
                .populate('Author LastReviewer CreatedBy UpdatedBy Menus MainMenu')
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .execAsync(),
            totalCursor
                .where('isTrashed').equals(false)
                .limit(1000)
                .countAsync()
        ]);
        debug('news list = %j', newsList);

        // 為每篇news加上PV
        let newsIds = [];
        newsList = _.map(newsList,(news)=>{
            newsIds.push(news._id);
            return news.toJSON();
        });
        let pageviews = await Pageview.find()
            .where('newsId').in(newsIds)
            .execAsync();
        let pageviewGroups = _.groupBy(pageviews,'newsId');
        newsList = _.map(newsList,(news)=>{
            news.pageviews = _.sumBy(pageviewGroups[news.id], 'pageviews') || 0;
            return news;
        });

        debug('news list with pv = %j',newsList);
        // 處理分頁
        debug('total = %d', total);
        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            newsList,
            pageData
        });
    }catch(err) {
        return next(err);
    }
};
