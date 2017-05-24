import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:updatePersonalize');

import cron from 'cron';
import { updatePersonalize } from '../libs';

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 0 */1 * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            await updatePersonalize();
            return;
        } catch (err) {
            return console.log(err);
        }
    },

    start: false,
    runOnInit: true
});