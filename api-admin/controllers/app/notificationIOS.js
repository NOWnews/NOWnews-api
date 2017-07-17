
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:app:notificationIOS');

import apn from 'apn';
import config from 'config';
import Promise from 'bluebird';
import _ from 'lodash';

const apnConnection = new apn.Provider({
    cert: config.get('general.apn.cert'),
    key: config.get('general.apn.key'),
    passphrase: config.get('general.apn.passphrase'),
    production: config.get('general.apn.production'),
    maxConnections: config.get('general.apn.maxConnections')
});

import { AppInfo } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        debug('req.body = %j', req.body);

        let devices = await AppInfo.find()
            .where('os').equals('IOS')
            .execAsync();
        debug('ios devices length = %d', devices.length);

        let deviceTokens = _.map(devices, (device) => {
            return device.token;
        });

        // 製作 notification 要用的物件
        let note = new apn.Notification();
        note.topic = 'com.nownews.news';
        note.body = req.body.summary;
        note.title = req.body.title;
        note.sound = 'ping.aiff';
        note.launchImage = req.body.image;
        note.urlArgs = [req.body.url];
        // note.badge = 1;
        // note.contentAvailable = 1;
        // note.mutableContent = 1;

        // 都先吐 200 要不然連線太久會 timeout
        res.status(200).send();

        // 送出推播資料
        let results = Promise.map(deviceTokens, (token) => {
            return apnConnection.send(note, token)
                .then((result) => {
                    console.log(result);
                    return Promise.resolve(result);
                });
        }, { concurrency: 50 });
        debug('results = %j', results);

        return next();
    } catch(err) {
        return next(err);
    }
};
