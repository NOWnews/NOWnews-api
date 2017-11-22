import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:updateBig5Small5');

import cron from 'cron';
import { updateBig5Small5 } from '../libs';

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 */3 * * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            await updateBig5Small5();
            return;
        } catch (err) {
            return console.log(err);
        }
    },

    start: false,
    runOnInit: true
});
