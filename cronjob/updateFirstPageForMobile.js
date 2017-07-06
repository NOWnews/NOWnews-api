import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:updateFirstPageForMobile');

import cron from 'cron';
import { updateFirstPageForMobile } from '../libs';

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 */3 * * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            await updateFirstPageForMobile();
            return;
        } catch (err) {
            return console.log(err);
        }
    },

    start: false,
    runOnInit: true
});