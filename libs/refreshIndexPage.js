import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:refreshIndexPage');

import Promise from 'bluebird';
import moment from 'moment-timezone';
import _ from 'lodash';

import { IndexPage } from '../models';
import redis from '../redis';

module.exports = async () => {
    try {

        let indexPage = await IndexPage.findOne()
            .populate('carousels specialTopics specialChannels videos UpdatedBy')
            .lean()
            .execAsync();

        // 檢查輪播是否有被刪除
        let removedCarouselIds = [];
        indexPage.carousels.forEach((item) => {
            if(item.isTrashed === true || item.status !== 'RELEASE') {
                removedCarouselIds.push(item._id);
            }
        });

        // 檢查特輯是否有被刪除
        let removedChannelIds = [];
        indexPage.specialChannels.forEach((item) => {
            if(item.isTrashed === true) {
                removedChannelIds.push(item._id);
            }
        });

        // 檢查專題是否有被刪除
        let removedTopicIds = [];
        indexPage.specialTopics.forEach((item) => {
            if(item.isTrashed === true) {
                removedTopicIds.push(item._id);
            }
        });

        // 檢查影音是否有被刪除
        let removedVideoIds = [];
        indexPage.videos.forEach((item) => {
            if(item.isTrashed === true) {
                removedVideoIds.push(item._id);
            }
        });

        await IndexPage.findOneAndUpdateAsync({}, {
            $pullAll: {
                carousels: removedCarouselIds,
                specialChannels: removedChannelIds,
                specialTopics: removedTopicIds,
                videos: removedVideoIds,
            }
        }, {
            new: true
        });

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};