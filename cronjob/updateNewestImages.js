import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:updateNewestImages');

import cron from 'cron';
import { updateNewestImages } from '../libs';

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 */3 * * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            await updateNewestImages();
            return;
        } catch (err) {
            return console.log(err);
        }
    },

    start: false,
    runOnInit: true
});
