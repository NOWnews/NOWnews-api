
import { NewsLog } from '../models';
import moment from 'moment-timezone';
import Promise from 'bluebird';

module.exports = async (news, action = 'CREATE') => {
    try {

        if(!news) {
            throw new Error('');
        }

        // 強制轉換成 Object
        news = news.toObject();

        let options = {
            newsId: news._id,
            newsSn: news.sn,
            title: news.title,
            shortTitle: news.shortTitle,
            summary: news.summary,
            MainMenu: news.MainMenu,
            Menus: news.Menus,
            MainPhoto: news.MainPhoto,
            MainVideo: news.MainVideo,
            content: news.content,
            Photos: news.Photos,
            Videos: news.Videos,
            freeContent: news.freeContent,
            startedAt: moment.tz(news.startedAt, 'Asia/Taipei').format('YYYY/MM/DD HH:mm'),
            type: news.type,
            status: news.status,
            traceCode: news.traceCode,
            isAdult: news.isAdult,
            isDeliver: news.isDeliver,
            Author: news.Author,
            newsBy: news.newsBy,
            Tags: news.Tags,
            isFeed: news.isFeed,
            feedFrom: news.feedFrom,
            LastReviewer: news.LastReviewer,
            CreatedBy: news.UpdatedBy,
            // UpdatedBy: news.UpdatedBy,
            action
        };

        if(news.location) {
            options.location = news.location;
        }

        let log = await NewsLog.createAsync(options);

        return Promise.resolve(log);
    } catch(err) {
        return Promise.reject(err);
    }
};
