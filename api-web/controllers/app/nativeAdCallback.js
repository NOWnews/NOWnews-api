/*
 * NOWlink 原生廣告，之後應該是要獨立系統從資料庫來做
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:app:nativeAdCallback');

import Promise from 'bluebird';

import { Nowlink, NowlinkLog } from '../../../pvModels';

module.exports = async (req, res, next) => {
    try {

        res.status(200).send();

        let placement = req.query.placement;
        let name = req.query.name;
        let event = req.query.event;

        let updateOption;
        if(event === 'impression') {
            updateOption = { $inc: { impression: 1 } };
        } else if(event === 'click') {
            updateOption = { $inc: { click: 1 } };
        }

        await Promise.all([
            Nowlink.findOneAndUpdateAsync({
                placement,
                name
            }, updateOption, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }),
            NowlinkLog.createAsync({
                placement,
                name,
                event: event.toUpperCase()
            })
        ]);

        return next();
    } catch(err) {
        return next(err);
    }
};