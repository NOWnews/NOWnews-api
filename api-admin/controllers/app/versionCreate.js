
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:app:versionCreate');

import { App } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { version, os, device, CreatedBy } = req.body;

        let newAppInfo = await App.createAsync({
            version,
            os,
            device,
            CreatedBy,
            UpdatedBy: CreatedBy
        });
        debug('new app info = %j', newAppInfo);

        return res.json(newAppInfo);
    } catch(err) {
        return next(err);
    }
};
