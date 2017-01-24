
import { NewsLog } from '../models'

module.exports = async (news, action = 'CREATE') => {
    try {

        if(!news) {
            throw new Error('');
        }

        let options = {
            newsId: news._id,
            newsSn: news.sn,
            title: news.title,
            shortTitle: news.shortTitle,
            summary: news.summary,
            MainPhoto: news.MainPhoto,
            MainVideo: news.MainVideo,
            content: news.content,
            Photos: news.Photos,
            Videos: news.Videos,
            freeContent: news.freeContent,
            startedAt: news.startedAt,
            type: news.type,
            status: news.status,
            traceCode: news.traceCode,
            isAdult: news.isAdult,
            isDeliver: news.isDeliver,
            Author: news.Author,
            Tags: news.Tags,
            isFeed: news.isFeed,
            feedFrom: news.feedFrom,
            CreatedBy: news.UpdatedBy,
            UpdatedBy: news.UpdatedBy,
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