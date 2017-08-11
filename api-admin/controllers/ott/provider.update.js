
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:provider.update');

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
            UpdatedBy
        } = req.body;

        provider.set('watchTime', watchTime);
        provider.set('lockTime', lockTime);
        provider.set('watchable', watchable);
        provider.set('icon', icon);
        provider.set('titleMessage', titleMessage);
        provider.set('downloadable', downloadable);
        provider.set('iosDownloadLink', iosDownloadLink);
        provider.set('androidDownloadLink', androidDownloadLink);
        provider.set('videoAD', videoAD);
        provider.set('UpdatedBy', UpdatedBy);

        let updatedProvider = await provider.saveAsync();

        return res.status(200).json(updatedProvider);

    } catch (err) {
        return next(err);
    }
};
