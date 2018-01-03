
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:app:eventLog');

import { AppEventLog } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        // 都先回應正確，射後不理
        res.status(200).send();

        let { token, deviceId, os, event } = req.body;

        if (!token || !os || !deviceId || token === '' || token === 'null') {
            return next();
        }

        console.log(`AppEventLog => ${os}, ${deviceId}`);

        const result = await AppEventLog.create({
                token,
                os,
                event,
                deviceId
            });

        return next();

    } catch(err) {
        return next(err);
    }
};