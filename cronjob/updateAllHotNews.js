import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:updateAllHotNews');

import cron from 'cron';
import { updateAllHotNews } from '../libs';

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 */5 * * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            await updateAllHotNews();
            return;
        } catch (err) {
            return console.log(err);
        }
    },

    start: false,
    runOnInit: true
});