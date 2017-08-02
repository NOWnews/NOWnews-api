

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
                { token: 'e9AGh5PTqYk:APA91bHFNqrarWJ1zVUeD72iaNf9pLY-2LIhW0i2K6N3iT4nw1ktWvZT9qE5RElkPRx9ksWaVCEFUb4VOlZp2-ylnrkLdZDs0iTvCE8ThK9CPMIaunEtnEEs7uwRA4f-ekwRlH6YXQcT' }
            ];
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



// import Debug from 'debug';
// const debug = Debug('NOWnews-api:api-admin:controllers:app:notificationIOS');

// import apn from 'apn';
// import config from 'config';
// import Promise from 'bluebird';
// import _ from 'lodash';

// const apnConnection = new apn.Provider({
//     cert: config.get('general.apn.cert'),
//     key: config.get('general.apn.key'),
//     passphrase: config.get('general.apn.passphrase'),
//     production: config.get('general.apn.production'),
//     maxConnections: config.get('general.apn.maxConnections')
// });

// import { AppInfo } from '../../../models';

// module.exports = async (req, res, next) => {
//     try {

//         debug('req.body = %j', req.body);

//         let devices = await AppInfo.find()
//             .where('os').equals('IOS')
//             .execAsync();
//         debug('ios devices length = %d', devices.length);

//         let deviceTokens = _.map(devices, (device) => {
//             return device.token;
//         });

//         // 製作 notification 要用的物件
//         let note = new apn.Notification();
//         note.topic = 'com.nownews.news';
//         note.body = req.body.summary;
//         note.title = req.body.title;
//         note.sound = 'ping.aiff';
//         note.launchImage = req.body.image;
//         note.urlArgs = [req.body.url];
//         // note.badge = 1;
//         // note.contentAvailable = 1;
//         // note.mutableContent = 1;

//         // 都先吐 200 要不然連線太久會 timeout
//         res.status(200).send();

//         // 送出推播資料
//         let results = Promise.map(deviceTokens, (token) => {
//             return apnConnection.send(note, token)
//                 .then((result) => {
//                     console.log(result);
//                     return Promise.resolve(result);
//                 });
//         }, { concurrency: 50 });
//         debug('results = %j', results);

//         return next();
//     } catch(err) {
//         return next(err);
//     }
// };
