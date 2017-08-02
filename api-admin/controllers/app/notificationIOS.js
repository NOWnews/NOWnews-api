

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:app:notificationIOS');

import config from 'config';
import _ from 'lodash';
import Promise from 'bluebird';
import firebaseAdmin from 'firebase-admin';

import { AppInfo } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let mode = config.get('admin.mode');

        let devices = await AppInfo.find()
            .where('os').equals('IOS')
            .execAsync();
        debug('android devices length = %d', devices.length);


        /*
         * 正式程式碼
         */
        let deviceTotal = devices.length;
        let countTotal = 0;
        let count = 0;
        let countTokens = [];
        let tokensCollection = [];
        console.log(`IOS devices total = ${deviceTotal}`);

        /*
         * 非正式環境用的 devices
         */
        if(mode !== 'production') {
            devices = [
                { token: 'e9AGh5PTqYk:APA91bHFNqrarWJ1zVUeD72iaNf9pLY-2LIhW0i2K6N3iT4nw1ktWvZT9qE5RElkPRx9ksWaVCEFUb4VOlZp2-ylnrkLdZDs0iTvCE8ThK9CPMIaunEtnEEs7uwRA4f-ekwRlH6YXQcT' },
                { token: 'dat3LYEYNIA:APA91bGIIyztnkOx4neRzXFxdTVM-7da15IvEcOtCsrtULMC3eITIqfSqdF7BCvVyc_2TNPzbi6l2gd2FAL6LxCxowsu886MCuv5y6-qYlayOdpQQKhaeUpBNQ-f86czu6YoMO1BwNcf' }
            ];
            deviceTotal = devices.length;
        }

        _.forEach(devices, (device) => {

            countTokens.push(device.token);
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
