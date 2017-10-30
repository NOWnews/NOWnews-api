
import Promise from 'bluebird';
import { News } from '../searchModels';
import { htmlToText, removePunctuations } from '../libs';

const pickData = (news) => {
    let content = htmlToText(news.content);
    content = removePunctuations(content);
    return {
        newsId: news._id,
        newsSn: news.sn,
        title: news.title,
        shortTitle: news.shortTitle,
        content,
        startedAt: news.startedAt,
        createdAt: news.createdAt || undefined,
        updatedAt: news.updatedAt || undefined,
        CreatedBy: news.CreatedBy,
        status: news.status,
        isTrashed: news.isTrashed
    };
};

module.exports = async (news) => {
    try {
        news = pickData(news);
        let searchNews = await News.createAsync(news);
        return Promise.resolve(searchNews);
    } catch (err) {
        return Promise.reject(err);
    }
};