import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:cleanInvalidToken');

import cron from 'cron';
import { cleanInvalidToken } from '../libs';

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '* 0 0 * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            await cleanInvalidToken();
            return;
        } catch (err) {
            return console.log(err);
        }
    },

    start: false,
    runOnInit: true
});