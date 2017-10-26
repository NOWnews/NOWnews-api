/*
 * 用來清理重複 device 的資料
 * 啟動方式: NODE_ENV=${NODE_ENV} node tools/cleanRepeatDevices.js ${OS}
 * OS: 'IOS', 'ANDROID', 'WEB'
 */

require('babel-core/register');
require('babel-polyfill');

const models = require('../models');
const _ = require('lodash');
const Promise = require('bluebird');

let removeIds = [];

const os = process.argv[2];

models.AppInfo.aggregateAsync([
        {
            $match: {
                os: os
            }
        },
        {
            $group: {
                _id: '$deviceId',
                devices: {
                    '$push': {
                        _id: '$_id',
                        deviceId: '$deviceId',
                        os: '$os',
                    }
                }
            }
        },
        { $sort : { createdAt : -1 } }
    ])
    .then((docs) => {
        _.each(docs, (doc) => {
            if(!doc.devices || doc.devices.length <= 1) {
                return;
            }

            _.each(doc.devices, (device, idx) => {
                if(idx === 1) { return; }
                removeIds.push(device._id);
                return;
            });

            return;
        });

        return models.AppInfo.removeAsync({ _id: { $in : removeIds } });
    })
    .then((result) => {
        console.log('清除完成');
        return process.exit();
    });