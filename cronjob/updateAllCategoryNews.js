import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:updateAllCategoryNews');

import cron from 'cron';
import { updateAllCategoryNews } from '../libs';

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 */3 * * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            await updateAllCategoryNews();
            return;
        } catch (err) {
            return console.log(err);
        }
    },

    start: false,
    runOnInit: true
});