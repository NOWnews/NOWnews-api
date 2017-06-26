
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:app:version');

import { AppVersion } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { version, os, device } = req.query;

        let causor = AppVersion.findOne()
            .where('isTrashed').equals(false);

        if(version) {
            causor.where('version').equals(version);
        }

        if(os) {
            causor.where('os').equals(os);
        }

        if(device) {
            causor.where('device').equals(device);
        }

        let appInfo = await causor
            .select('version device os sn')
            .sort('-createdAt')
            .execAsync();

        return res.json(appInfo);
    } catch (err) {
        return next(err);
    }
};