
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:app:notificationWeb');

import _ from 'lodash';
import Promise from 'bluebird';
import firebaseAdmin from 'firebase-admin';

import { AppInfo } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        const deviceCollections = await AppInfo.find({
            os: 'WEB',
            token: {
                $exists: true,
                $nin: ['', null]
            }
        })
        .lean()
        .select('token')
        .execAsync();

        const devices = _.map(deviceCollections, 'token');

        console.log(`Web devices total = ${devices.length}`);

        const tokensCollection = _.chunk(devices, 1000);
        const utmString = '?utm_source=web_notification&utm_medium=nownews&utm_campaign=post';
        let payload = {
            data: {
                type: 'NORMAL',
                id: '',
                title: req.body.title,
                summary: req.body.summary,
                image: req.body.image,
                url: `${req.body.url}${utmString}`
            },
            notification: {
                title: req.body.title,
                body: req.body.summary,
                icon: req.body.image,
                clickAction: `${req.body.url}${utmString}`
            }
        };

        let responses = await Promise.map(tokensCollection, (tokenArray) => {
            return firebaseAdmin.messaging().sendToDevice(tokenArray, payload, { timeToLive: 60 * 60 * 24 });
        }, { concurrency: 10 });

        // show result
        let successd = 0, faild = 0;
        _.forEach(responses, (response) => {

            faild += response.failureCount;
            
            successd += response.successCount;

            if (response.failureCount === 0 ) {
                return;
            }
            _.forEach(response.results, (result) => {

                // 正確傳送時會有 messageId
                if (result.messageId || !result.error) {
                    return;
                }

                const errorInfo = result.error.errorInfo;
                console.error('Push Web Notification Fail =>', errorInfo.code);
            });  

        });

        console.log(`推播結果：successed: ${successd}, faild: ${faild}`);
        return res.json({
            faild, successd
        });
    } catch (err) {
        return next(err);
    }
};
