/*
 * 用來清理重複 token 的程式
 * 啟動方式: cd tools && NODE_ENV=${NODE_ENV} node tools/cleanRepeatDevices.js
 */

require('babel-core/register');
require('babel-polyfill');

const models = require('../models');
const _ = require('lodash');
const Promise = require('bluebird');

let count = 0;
let aliveObj = {};
let aliveIds = [];
let removeIds = [];

models.AppInfo.find()
    .where('token').ne(null)
    .where('token').ne('null')
    .where('token').ne('')
    .where('token').exists()
    .where('deviceId').exists()
    .where('os').exists()
    .sort('-_id')
    .execAsync()
    .then((docs) => {
        console.log(`資料的總數: ${docs.length}`);
        _.forEach(docs, (doc) => {
            if(!aliveObj[doc.token]) {
                aliveObj[doc.token] = doc;
                aliveIds.push(doc._id);
                return;
            }
            removeIds.push(doc._id);
            return;
        });
        console.log(`不清除的總數: ${aliveIds.length}`);
        console.log(`清除的總數: ${removeIds.length}`);

        return models.AppInfo.removeAsync({ _id: { $in : removeIds } });
    })
    .then((result) => {
        console.log('清除完成');
        return process.exit();
    });