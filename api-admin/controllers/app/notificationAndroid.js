
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:app:notificationAndroid');

import config from 'config';
import _ from 'lodash';
import Promise from 'bluebird';
import firebaseAdmin from 'firebase-admin';

import { AppInfo } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let mode = config.get('admin.mode');

        let devices = await AppInfo.find()
            .where('os').equals('ANDROID')
            .and([
                { token: { $exists: true } },
                { token: { $ne: '' } },
                { token: { $ne: null } },
                { token: { $ne: 'null' } }
            ])
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
        console.log(`Android devices total = ${deviceTotal}`);

        /*
         * 非正式環境用的 devices
         */
        if(mode !== 'production') {
            devices = [
                { token: 'dP1_xAexXMY:APA91bFgr_LiFBiTwpun80Ds90yAhPwytFqR4gVnpMo51rP46hVb2nA-SXFhOWmXTS4KJGFotdTQlmhVLjuheBkkI9XbkFxqsCQB0_vzEiOmIpx00nTQT8aeMrYJzLOmUkiSIVuH74sy' },
                { token: 'cNPgV00NEwM:APA91bHO_WUqnci3uVhpiKDMCX0cYYntwrnzinJz1DvpRznfoLa-R_LehgR6PSxUywkCHTp9npgZ5FSr7GvGgZO6muZQwLnGWgF6DO0ZKwr6NDJVy_xnRibH92HiYaut2_TIMDIv3j_P' },
                { token: 'eOKD5diP5ZA:APA91bHKC-puNylaU5WE-zDDe2dRng40FPobXrJfNtElWwSMK1xWB40CfDnte4dN6vrbcLH-ZummWEvSXMRMFBGYZUbFE8ymzqPIT8oYCtXjyw1-SD9E6AsUuDTgwBy_S5bBpans1nh-' },
                { token: 'cG0q9q_HvsQ:APA91bGy8q1rF13BKvPcFj8L4Ic5jZAtW6zy6U1J4y6_6qtuoIt2K5QiR886ALmMOqG-45i_Gt8UzkKGoWuvuryr_6EJ0JY1BEaoydmi5EFtS8U3WhdIZ9sRIq7QBn8lAzWQE4e6xhxZ' }
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
