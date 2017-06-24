
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:app:version');

import { App } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { version, os, device } = req.query;
        console.log(req.query);

        let causor = App.findOne()
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