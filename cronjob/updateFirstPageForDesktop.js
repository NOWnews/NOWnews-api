import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:updateFirstPageForDesktop');

import cron from 'cron';
import { updateFirstPageForDesktop } from '../libs';

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 */30 * * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            await updateFirstPageForDesktop();
            return;
        } catch (err) {
            return console.log(err);
        }
    },

    start: false,
    runOnInit: true
});