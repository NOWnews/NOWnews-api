
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:app:notificationWeb');

import config from 'config';
import _ from 'lodash';
import Promise from 'bluebird';
import firebaseAdmin from 'firebase-admin';

import { AppInfo } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let mode = config.get('admin.mode');


        let devices = await AppInfo.aggregateAsync([
            {
                $match: {
                    os: 'WEB'

                }
            },
            {
                $group: {
                    _id: '$token'
                }
            }
        ]);
        debug('web devices length = %d', devices.length);


        /*
         * 正式程式碼
         */
        let deviceTotal = devices.length;
        let countTotal = 0;
        let count = 0;
        let countTokens = [];
        let tokensCollection = [];
        console.log(`web device total = ${deviceTotal}`);

        /*
         * 非正式環境用的 devices
         */
        if(mode !== 'production') {
            devices = [
                { _id: 'dO7bE_a4TYE:APA91bGOTczVmmd_XtZv8sK6Rzqf-1YEJAqg8S5vGT0aMXLWaPt7ZZb18nLVQhQOPzRpg1EmJ5R12OKbD1G7j0TtV4Omis5ZO6RC1WugDbDd18LOqGDwEyF859-XLIiWUqLEb0sad17Y' }
            ];
            deviceTotal = devices.length;
        }

        _.forEach(devices, (device) => {

            countTokens.push(device._id);
            countTotal++;
            count++;

            if(count === 1000 && countTotal <= deviceTotal) {
                debug('info: 滿 1000 筆，但是總筆數「還沒滿」');
                debug('count = %d', count);
                debug('countTotal = %d', countTotal);
                tokensCollection.push(countTokens);
                countTokens = [];
                count = 0;
                return;
            }

            if(count < 1000 && countTotal === deviceTotal) {
                debug('info: 未滿 1000 筆，但是總筆數已經「滿了」');
                debug('count = %d', count);
                debug('countTotal = %d', countTotal);
                tokensCollection.push(countTokens);
                return;
            }
        });

        let payload = {
            data: {
                type: 'NORMAL',
                id: '',
                title: req.body.title,
                summary: req.body.summary,
                image: req.body.image,
                url: req.body.url
            },
            notification: {
                title: req.body.title,
                body: req.body.summary,
                icon: req.body.image,
                clickAction: req.body.url
            }
        };

        let results = await Promise.map(tokensCollection, (tokenArray) => {
            return firebaseAdmin.messaging().sendToDevice(tokenArray, payload, { priority: "high", timeToLive: 60 * 60 * 24 });
        });
        console.log(results);

        return res.status(200).send();
    } catch (err) {
        return next(err);
    }
};
