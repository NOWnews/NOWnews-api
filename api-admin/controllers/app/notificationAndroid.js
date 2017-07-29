
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:app:notificationAndroid');

import config from 'config';
import _ from 'lodash';
import Promise from 'bluebird';
import firebaseAdmin from 'firebase-admin';

import { AppInfo } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let devices = await AppInfo.find()
            .where('os').equals('ANDROID')
            .execAsync();
        debug('android devices length = %d', devices.length);


        /*
         * 正式程式碼
         */
        // let deviceTotal = devices.length;
        // let countTotal = 0;
        // let count = 0;
        // let countTokens = [];
        // let tokensCollection = [];

        // _.forEach(devices, (device) => {

        //     countTokens.push(device.token);
        //     countTotal++;
        //     count++;

        //     if(count === 1000 && countTotal <= deviceTotal) {
        //         debug('info: 滿 1000 筆，但是總筆數「還沒滿」');
        //         debug('count = %d', count);
        //         debug('countTotal = %d', countTotal);
        //         tokensCollection.push(countTokens);
        //         countTokens = [];
        //         count = 0;
        //         return;
        //     }

        //     if(count < 1000 && countTotal === deviceTotal) {
        //         debug('info: 未滿 1000 筆，但是總筆數已經「滿了」');
        //         debug('count = %d', count);
        //         debug('countTotal = %d', countTotal);
        //         tokensCollection.push(countTokens);
        //         return;
        //     }
        // });

        // let payload = {
        //     data: {
        //         type: 'NORMAL',
        //         id: '',
        //         title: req.body.title,
        //         summary: req.body.summary,
        //         image: req.body.image,
        //         url: req.body.url
        //     }
        // };


        /*
         * 測試用程式碼
         */
        let tokensCollection = [
            [
                'cNPgV00NEwM:APA91bHO_WUqnci3uVhpiKDMCX0cYYntwrnzinJz1DvpRznfoLa-R_LehgR6PSxUywkCHTp9npgZ5FSr7GvGgZO6muZQwLnGWgF6DO0ZKwr6NDJVy_xnRibH92HiYaut2_TIMDIv3j_P'
            ]
        ];


        let payload = {
            data: {
                type: 'NORMAL',
                id: '',
                title: req.body.title || 'Simon 在測試 IOS 推播',
                summary: req.body.summary || '測試 FCM IOS 推播',
                image: req.body.image || 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20229308_2096348700391285_8820170491411309922_n.jpg?oh=472aa48e7c5582b081beae96bed4ac18&oe=59FE6F24',
                url: req.body.url || 'https://www.nownews.com/news/20170726/2593298'
            },
            notification: {
                title: `${req.body.title}` || '測試 IOS 推播 title',
                body: `${req.body.summary}` || '測試 IOS 推播 summary',
                icon: req.body.image || 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20229308_2096348700391285_8820170491411309922_n.jpg?oh=472aa48e7c5582b081beae96bed4ac18&oe=59FE6F24',
                clickAction: req.body.url || 'https://www.nownews.com/news/20170726/2593298'
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
