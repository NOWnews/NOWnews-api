
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:app:versionList');

import { AppVersion } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let appInfoList = await AppVersion.find()
            .where('isTrashed').equals(false)
            .sort('-createdAt')
            .execAsync();
        debug('app info list = %j', appInfoList);

        return res.json(appInfoList);

    } catch(err) {
        return next(err);
    }
};
