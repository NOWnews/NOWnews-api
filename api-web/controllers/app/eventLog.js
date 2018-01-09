
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:app:eventLog');

import { AppEventLog } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        // 都先回應正確，射後不理
        res.status(200).send();

        let { action, deviceId, os, token, type, sn } = req.body;

        if (!os || !deviceId) {
            return next();
        }

        console.log(`AppEventLog => ${os}, ${deviceId}, ${type}, ${action}`);

        const result = await AppEventLog.create({
            action,
            deviceId,
            os,
            sn,
            token,
            type,
        });

        return next();

    } catch(err) {
        return next(err);
    }
};