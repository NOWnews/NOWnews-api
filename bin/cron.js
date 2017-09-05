require('babel-core/register');
require('babel-polyfill');

let initDataStart = require('../initData/start');
const cronjobs = require('../cronjob');

// 初始化資料
initDataStart()
    .then(result => {
        cronjobs();
        console.log('cron job start');
    }).catch(err => {
        console.error('初始化資料失敗', err);
    });
