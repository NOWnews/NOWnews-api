
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:app:versionCreate');

import { AppVersion } from '../../../models';
import is from 'is_js';

module.exports = async (req, res, next) => {
    try {

        let { version, os, device, downloadLink, CreatedBy } = req.body;

        if(downloadLink && !is.url(downloadLink)){
            throw new Error('26001');
        }

        let newAppInfo = await AppVersion.createAsync({
            version,
            os,
            device,
            downloadLink,
            CreatedBy,
            UpdatedBy: CreatedBy
        });
        debug('new app info = %j', newAppInfo);

        return res.json(newAppInfo);
    } catch(err) {
        return next(err);
    }
};
