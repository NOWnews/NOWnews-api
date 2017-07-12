
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:app:info');

import { AppInfo } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        // 都先回應正確，射後不理
        res.status(200).send();

        let { token, deviceId, os, MemberId } = req.body;

        await AppInfo.findOneAndUpdateAsync({
                deviceId,
                os
            }, {
                $set: {
                    deviceId,
                    token,
                    os,
                    MemberId
                }
            }, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            });

        return next();
    } catch(err) {
        return next(err);
    }
};