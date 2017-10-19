import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:cleanInvalidToken');
import firebaseAdmin from 'firebase-admin';

import Promise from 'bluebird';
import _ from 'lodash';
import initFirebase from './initFirebase';

import { AppInfo } from '../models';

module.exports = () => {
 return new Promise(async (resolve, reject) => {
    try {
        
        initFirebase();

        const deviceCollections = await AppInfo.find({
            token: {
                $exists: true,
                $nin: ['', null]
            }
        })
        .lean()
        .select('token')
        .execAsync();

        const devices = _.map(deviceCollections, 'token');

        // 1000 個一組，Google FCM 一次 request 的數量限制
        const tokensCollection = _.chunk(devices, 1000);
        const payload = {
            notification: {
                title: '測試',
                body: 'dry_run 不會真的送出'
            }
        }

        const responses = await Promise.mapSeries(tokensCollection, (tokenArray) => {
            return firebaseAdmin.messaging().sendToDevice(tokenArray, payload, { dry_run: true });
        });

        let removeTokens = [];

        _.forEach(responses, async (response, resIndex) => {


            if (response.failureCount === 0 ) {
                return;
            }

            let failureCount = 0;
            
            _.forEach(response.results, (result, resultIndex) => {

                // 錯誤總數相同就離開，不繼續跑迴圈
                if (failureCount === response.failureCount) {
                    return false;
                }

                // 正確傳送時會有 messageId
                if (result.messageId || !result.error) {
                    return;
                }

                failureCount++;

                const errorInfo = result.error.errorInfo;
                switch (errorInfo.code) {
                    case 'messaging/mismatched-credential':
                    case 'messaging/invalid-registration-token':
                    case 'messaging/registration-token-not-registered':
                        removeTokens.push(tokensCollection[resIndex][resultIndex]);
                        break
                    default:
                        console.error('result.error.errorInfo', errorInfo);
                }
            });  
        });

        console.log(`應刪除數量: ${removeTokens.length}`);

        const removeTokensCollection = _.chunk(removeTokens, 1000);

        const deleteResponses = await Promise.mapSeries(removeTokensCollection, (tokens) => {
            return AppInfo.removeAsync({ token: { $in : tokens } });
        });

        let deletedCount = 0;
        _.forEach(deleteResponses, (res) => {
            deletedCount += res.result.n;
        });
        
        console.log(`實際刪除數量: ${deletedCount}`);


        return resolve();

     } catch (e) {
         return reject(e);
     }
 });
}
