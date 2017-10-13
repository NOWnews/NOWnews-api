
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:app:info');

import { AppInfo } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        // 都先回應正確，射後不理
        res.status(200).send();

        let { token, deviceId, os, MemberId } = req.body;

        if (!token || !os || !deviceId || token === '' || token === 'null') {
            return next();
        }

        // 如果有 token 一樣，就更新 deviceId
        const matchResult = await AppInfo.findOneAndUpdateAsync({
                token,
                os
            }, {
                $set: {
                    deviceId,
                    MemberId
                }
            });

        if (matchResult) {
            return next();
        }

        // 如果有 deviceId 一樣，就更新 token，反之建立新的
        await AppInfo.findOneAndUpdateAsync({
                deviceId,
                os
            }, {
                $set: {
                    token,
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