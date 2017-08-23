/*
 * 用來清理無用或是錯誤 token 的程式
 * 啟動方式: cd tools && NODE_ENV=${NODE_ENV} node tools/cleanUselessDevices.js
 */

require('babel-core/register');
require('babel-polyfill');

const models = require('../models');
const _ = require('lodash');
const Promise = require('bluebird');

let removeIds = [];

models.AppInfo.find()
    .or([
        { token: null },
        { token: '' },
        { token: 'null' },
        { updatedAt: { $exists: false } },
        { createdAt: { $exists: false } },
        { token: { $exists: false } },
        { deviceId: { $exists: false } },
        { os: { $exists: false } },
    ])
    .lean()
    .execAsync()
    .then((docs) => {
        _.each(docs, (doc) => {
            removeIds.push(doc._id);
        });
        return models.AppInfo.removeAsync({ _id: { $in : removeIds } });
    })
    .then((result) => {
        console.log('清除完成');
        return process.exit();
    });