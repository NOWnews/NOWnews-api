import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:updateBig5Small5');

import cron from 'cron';
import { updateBig5Small5 } from '../libs';

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 */5 * * * *',

    // 主要邏輯區
    onTick: async () => {
        console.log(`------------- Auto 即時新聞 Start -------------`);
        try {
            await updateBig5Small5();
            return;
        } catch (err) {
            return console.log(err);
        }
        console.log(`------------- Auto 即時新聞 End -------------`);
    },

    start: false,
    runOnInit: true
});
