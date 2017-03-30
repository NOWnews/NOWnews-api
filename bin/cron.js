require('babel-core/register');
require('babel-polyfill');

const cronjobs = require('../cronjob');

cronjobs();
console.log('cron job start');