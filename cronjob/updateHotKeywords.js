import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:updateHotKeywords');

import cron from 'cron';
import { updateHotKeywords } from '../libs';

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 */10 * * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            await updateHotKeywords();
            return;
        } catch (err) {
            return console.log(err);
        }
    },

    start: false,
    runOnInit: true
});