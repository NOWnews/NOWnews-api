import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getChannelsByPlatform');

import Promise from 'bluebird';
import _ from 'lodash';
import { Provider } from '../ottModels';

module.exports = async (platform) => {
    try {

        platform = platform || 'NOWNEWS';

        let provider = await Provider.findOne()
            .where('platform').equals(platform)
            .where('isTrashed').equals(false)
            .deepPopulate('data data.channels')
            .lean()
            .execAsync();

        if(!provider) {
            throw new Error('12001');
        }

        let result = {
            liveInfo: {},
            data: []
        };

        result.liveInfo.watchTime = provider.watchTime;
        result.liveInfo.lockTime = provider.lockTime;
        result.liveInfo.watchable = provider.watchable;
        result.liveInfo.icon = provider.icon;
        result.liveInfo.titleMessage = provider.titleMessage;
        result.liveInfo.downloadable = provider.downloadable;
        result.liveInfo.iosDownloadLink = provider.iosDownloadLink;
        result.liveInfo.androidDownloadLink = provider.androidDownloadLink;
        result.liveInfo.videoAD = provider.videoAD;
        result.liveInfo.leftbutton = provider.leftbutton;
        result.liveInfo.rightbutton = provider.rightbutton;


        _.forEach(provider.data, (category) => {
            let obj = {
                list: []
            };
            obj.categoryName = category.name;
            obj.count = category.channels.length;

            _.forEach(category.channels, (channel) => {
                obj.list.push({
                    SN: '',
                    code: '',
                    title: channel.title,
                    path: channel.path
                });
            });

            result.data.push(obj);
        });

        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
};