/*
 * 用來清理重複 browser 重複 token
 * 啟動方式: NODE_ENV=${NODE_ENV} node tools/cleanRepeatTokenForWeb.js
 */

require('babel-core/register');
require('babel-polyfill');

const models = require('../models');
const _ = require('lodash');

let removeIds = [];
models.AppInfo.aggregateAsync([
        {
            $match: {
                os: 'WEB'
            }
        },
        {
            $group: {
                _id: '$token',
                devices: {
                    '$push': '$_id'
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

            _.each(doc.devices, (deviceId, index) => {
                if (index === 0) { 
                    return; 
                }
                removeIds.push(deviceId);
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