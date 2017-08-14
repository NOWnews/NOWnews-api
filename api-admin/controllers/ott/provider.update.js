
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:provider.update');

import { getChannelsByPlatform } from '../../../libs';
import redis from '../../../redis';
import { Provider } from '../../../ottModels';

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;

        let provider = await Provider.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

        if(!provider) {
            throw new Error('');
        }

        let {
            watchTime,
            lockTime,
            watchable,
            icon,
            titleMessage,
            downloadable,
            iosDownloadLink,
            androidDownloadLink,
            videoAD,
            leftbutton,
            rightbutton,
            UpdatedBy
        } = req.body;


        if(watchTime) {
            provider.set('watchTime', watchTime);
        }

        if(lockTime) {
            provider.set('lockTime', lockTime);
        }

        if(watchable) {
            provider.set('watchable', watchable);
        }

        if(icon) {
            provider.set('icon', icon);
        }

        if(titleMessage) {
            provider.set('titleMessage', titleMessage);
        }

        if(downloadable) {
            provider.set('downloadable', downloadable);
        }

        if(iosDownloadLink) {
            provider.set('iosDownloadLink', iosDownloadLink);
        }

        if(androidDownloadLink) {
            provider.set('androidDownloadLink', androidDownloadLink);
        }

        if(videoAD) {
            provider.set('videoAD', videoAD);
        }


        if(leftbutton) {
            provider.set('leftbutton', leftbutton);
        }


        if(rightbutton) {
            provider.set('rightbutton', rightbutton);
        }


        provider.set('UpdatedBy', UpdatedBy);

        let updatedProvider = await provider.saveAsync();

        let result = await getChannelsByPlatform(updatedProvider.platform);
        await redis.setValue(`OTTProvider${updatedProvider.platform}`, result);

        return res.status(200).json(updatedProvider);

    } catch (err) {
        return next(err);
    }
};
