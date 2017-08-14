
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:provider.create');

import Promise from 'bluebird';
import _ from 'lodash';

import { getChannelsByPlatform } from '../../../libs';
import redis from '../../../redis';
import { Provider } from '../../../ottModels';

module.exports = async (req, res, next) => {

    try {

        let {
            platform,
            watchTime,
            lockTime,
            watchable,
            icon,
            titleMessage,
            downloadable,
            iosDownloadLink,
            androidDownloadLink,
            videoAD,
            rightbutton,
            leftbutton,
            CreatedBy
        } = req.body;
        debug('req.body = %j', req.body);

        let provider = await Provider.findOne()
            .where('platform').equals(platform)
            .where('isTrashed').equals('false')
            .execAsync();

        if(provider) {
            throw new Error('');
        }

        let newProvider = await Provider.createAsync({
            platform,
            watchTime,
            lockTime,
            watchable,
            icon,
            titleMessage,
            downloadable,
            iosDownloadLink,
            androidDownloadLink,
            videoAD,
            rightbutton,
            leftbutton,
            CreatedBy,
            UpdatedBy: CreatedBy
        });
        debug('new provider = %j', newProvider);

        let result = await getChannelsByPlatform(newProvider.platform);
        await redis.setValue(`OTTProvider${newProvider.platform}`, result);

        return res.status(200).json(newProvider);
    } catch (err) {
        return next(err);
    }
};
