import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getIndexPage');

import _ from 'lodash';
import { IndexPage, News } from '../models';
import Promise from 'bluebird';
const processMainPhotoFormat = (photo) => {
    return {
        url: photo.url,
        height: photo.height,
        width: photo.width,
        title: photo.title,
        desc: photo.desc,
        thumbnail: photo.thumbnail,
        googleCDN: photo.googleCDN,
        sizeFormat: photo.sizeFormat,
    }
}
module.exports = async () => {
    try {

        // 找出相關列表與分頁資料
        let [ newsList, indexPage ] = await Promise.all([
            News.find()
                .where('status').equals('RELEASE')
                .where('isTrashed').equals(false)
                .where('startedAt').lte(Date.now())
                .where('isFeed').equals(false)
                .where('isSponsored').equals(false)
                .populate([
                    {
                        path: 'MainMenu',
                        select: '_id sn name'
                    },
                    {
                        path: 'MainPhoto',
                        select: '_id sn url height desc width title'
                    },
                    {
                        path: 'MainVideo',
                        select: '_id url'
                    }
                ])
                .limit(35)
                .sort('-startedAt')
                .select('_id sn title shortTitle MainMenu MainPhoto MainVideo startedAt type')
                .execAsync(),
            IndexPage.findOne()
                .deepPopulate([
                    'specialTopics.MainPhoto',
                    'specialChannels.MainPhoto',
                    'videos.MainMenu',
                    'videos.MainPhoto',
                    'videos.MainVideo'
                ])
                .select('carousels specialTopics addCarousels hideCarousels specialChannels videos')
                .execAsync()
        ]);

        // toObject, 但虛擬欄位還是要存在
        indexPage = indexPage.toObject({ virtuals: true });

        // 處理手動跟刪除
        _.forEach(indexPage.carousels, (newsId, index) => {
            if (indexPage.hideCarousels.indexOf(newsId) > -1) {
                indexPage.carousels.splice(index, 1);
            }
            if (indexPage.addCarousels[index]) {
                indexPage.carousels[index] = indexPage.addCarousels[index];
            }
        });

        // 處理避免重複
        let carouselsIds = _.map(indexPage.carousels, (newsId) => {
            newsId = _.toString(newsId);
            return newsId;
        });
        newsList = _.filter(_.clone(newsList), (news) => {
            if (carouselsIds.indexOf(_.toString(news._id)) === -1) {
                return news;
            }
        });


        // 處理 carousels
        const limit = indexPage.carousels.length;
        let index = 0;
        while (index < limit) {
            let id = indexPage.carousels[index];
            if (id) {
                let NewsModel = await News.findById(id)
                    .populate({ path:'MainMenu MainPhoto', select: 'name url'})
                    .select('title shortTitle sn startedAt feedFrom MainMenu MainPhoto type')
                    .execAsync();
                indexPage.carousels[index] = NewsModel;
            }
            index++;
        }

        const result = {
            carousels: _.concat(indexPage.carousels, newsList),
            specialChannels: _.map(indexPage.specialChannels, (channel) => {
                return {
                    sn: channel.sn,
                    title: channel.title,
                    MainPhoto: processMainPhotoFormat(channel.MainPhoto)
                }
            }),
            specialTopics: [],
            // specialTopics: _.map(indexPage.specialTopics, (topic) => {
            //     return {
            //         sn: topic.sn,
            //         title: topic.title,
            //         MainPhoto: processMainPhotoFormat(topic.MainPhoto),
            //         createdAt: topic.createdAt,
            //         url: topic.url
            //     }
            // }),
            videos: _.map(indexPage.videos, (video) => {
                return {
                    sn: video.sn,
                    title: video.title,
                    shortTitle: video.shortTitle,
                    MainPhoto: processMainPhotoFormat(video.MainPhoto),
                    MainVideo: video.MainVideo,
                }
            }),
        }
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
};