/*
 * 用來清理重複 browser 重複 token
 * 啟動方式: NODE_ENV=${NODE_ENV} node tools/cleanRepeatTokenForWeb.js
 */

require('babel-core/register');
require('babel-polyfill');

const models = require('../models');
const _ = require('lodash');
const Promise = require('bluebird');

let removeIds = [];
models.AppInfo.find(
        {
            os: 'WEB'
        }
    )
    .then(async (docs) => {
        let countTokenObject = {};

        _.each(docs, ({ token, _id }) => {

            if (!countTokenObject[token]) {
                countTokenObject[token] = 1;
                return;
            } 
            removeIds.push(_id);

            return;
        });

        console.log(`應刪除數量: ${removeIds.length}`);

        const removeIdsCollection = _.chunk(removeIds, 10000);

        return Promise.mapSeries(removeIdsCollection, (ids) => {
            return models.AppInfo.removeAsync({ _id: { $in : ids } });
        });
    })
    .then((deleteResponses) => {

        let deletedCount = 0;
        _.forEach(deleteResponses, (res) => {
            deletedCount += res.result.n;
        });
        
        console.log(`實際刪除數量: ${deletedCount}`);

        return process.exit();
    })
    .then((result) => {
        console.log('清除完成');
        return process.exit();
    });