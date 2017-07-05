
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:app:notificationAndroid');

import config from 'config';
import gcm from 'node-gcm';
import _ from 'lodash';
import Promise from 'bluebird';

const sender = new gcm.Sender(config.get('general.gcm.key'));

import { AppInfo } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        debug('req.body = %j', req.body);

        let devices = await AppInfo.find()
            .where('os').equals('ANDROID')
            .execAsync();
        debug('android devices length = %d', devices.length);

        let note = new gcm.Message({
            data: {
                message: {
                    // type: 'NEWS',
                    // id: req.body.id,
                    title: req.body.title,
                    summary: req.body.summary,
                    image: req.body.image,
                    url: req.body.url
                }
            }
        });

        let deviceTotal = devices.length;
        let countTotal = 0;
        let count = 0;
        let countTokens = [];
        let tokens = [];

        _.forEach(devices, (device) => {

            countTokens.push(device.token);
            countTotal++;
            count++;

            if(count === 1000 && countTotal <= deviceTotal) {
                debug('info: 滿 1000 筆，但是總筆數「還沒滿」');
                debug('count = %d', count);
                debug('countTotal = %d', countTotal);
                tokens.push(countTokens);
                countTokens = [];
                count = 0;
                return;
            }

            if(count < 1000 && countTotal === deviceTotal) {
                debug('info: 未滿 1000 筆，但是總筆數已經「滿了」');
                debug('count = %d', count);
                debug('countTotal = %d', countTotal);
                tokens.push(countTokens);
                return;
            }
        });

        let results = await Promise.map(tokens, (tokenArray) => {
            return new Promise((resolve, reject) => {
                sender.send(note, { registrationTokens: tokenArray }, (err, response) => {
                    if(err) {
                        return reject(err);
                    }
                    console.log(response);
                    return resolve(response);
                });
            });
        });
        debug('results = %j', results);

        return res.status(200).send();
    } catch(err) {
        return next(err);
    }
};
