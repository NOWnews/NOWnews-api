
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:app:list');

import { App } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        console.log(12312341323);

        let { version, os, tablet } = req.query;
        console.log(req.query);

        let causor = App.findOne()
            .where('isTrashed').equals(false);

        if(version) {
            causor.where('version').equals(version);
        }

        if(os) {
            causor.where('os').equals(os);
        }

        if(tablet) {
            causor.where('tablet').equals(tablet);
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