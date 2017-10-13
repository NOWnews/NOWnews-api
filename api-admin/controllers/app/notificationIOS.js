

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:app:notificationIOS');

import _ from 'lodash';
import Promise from 'bluebird';
import firebaseAdmin from 'firebase-admin';

import { AppInfo } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        const devices = await AppInfo.distinct('token', {
            os: 'IOS',
            token: { 
                $exists: true,
                $ne: '',
                $ne: null,
            } 
        });
        
        console.log(`iOS devices total = ${devices.length}`);
        
        const tokensCollection = _.chunk(devices, 1000);

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
