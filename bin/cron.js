require('babel-core/register');
require('babel-polyfill');

let initDataStart = require('../initData/start');

const env = process.env.NODE_ENV || 'dev'; //若環境為 china 時 不執行匯入新聞 防止重複 https://github.com/NOWnews/NOWnews-api/issues/867

if( env === 'china'){
    const cronjobs = require('../cronjob/index-china.js');
}else{
    const cronjobs = require('../cronjob/index.js');
}

// 初始化資料
initDataStart()
    .then(result => {
        cronjobs();
        console.log('cron job start');
    }).catch(err => {
        console.error('初始化資料失敗', err);
    });
