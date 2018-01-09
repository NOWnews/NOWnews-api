import Debug from 'debug';
const debug = Debug('NOWnews-api:elasticsearch:create');
import Promise from 'bluebird';
import _ from 'lodash';
import client from './client';

module.exports = async (news) => {
    try {
        const result = await client.create({
            index: 'nownews',
            type: 'news',
            routing: (new Date(news.formatCreatedAt)).getDay(),
            id: news.sn,
            body: {
                sn: news.sn,
                title: news.title,
                type: news.type,
                shortTitle: news.shortTitle,
                CreatedBy: news.CreatedBy.name,
                MainMenu: news.MainMenu && [news.MainMenu.name],
                MainVideo: news.MainVideo && news.MainVideo.url,
                MainPhoto: news.MainPhoto && news.MainPhoto.url,
                Tags: _.map(news.Tags, 'name'),
                status: news.status,
                url: news.completeUrl,
                isSponsored: news.isSponsored,
                isTrashed: false,
                isAdult: news.isAdult,
                updatedAt: news.formatUpdatedAt,
                createdAt: news.formatCreatedAt,
                startedAt: news.formatStartedAt,
                summary: news.summary
            }
        });
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
};