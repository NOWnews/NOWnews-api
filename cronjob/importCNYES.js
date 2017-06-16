/*
 * TIPS: 增加這種接收 rss feed 的服務時，記得要去 initData/users.js 與 initData/menus.js 增加對應的 user 與 menu
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:importCNYES');

import config from 'config';
import cron from 'cron';
import _ from 'lodash';
import moment from 'moment-timezone';
import { parseRssFeed } from '../libs';
import { News } from '../models';

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 */5 * * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            let rssJSON = await parseRssFeed(`${config.get('general.rssFeed.cnyes')}`);

            let newsList = [];
            let nowTime = moment();
            let prevTime = moment().add(-5, 'm');

            _.forEach(rssJSON.rss.channel.item, (item) => {
                let newsPubDate = moment(new Date(item.pubDate));
                if(newsPubDate < prevTime) {
                    return;
                }

                console.log(`收錄新聞: ${item.title}`);
                console.log(`新聞發布時間: ${newsPubDate.tz('Asia/Taipei').format('YYYY-MM-DD HH:ss:mm')}`);
                console.log(`收錄時間區間: ${prevTime.tz('Asia/Taipei').format('YYYY-MM-DD HH:ss:mm')} ~ ${nowTime.tz('Asia/Taipei').format('YYYY-MM-DD HH:ss:mm')}`);
                console.log(`-------------------------------------------`);
                newsList.push({
                    title: item.title,
                    shortTitle: '',
                    summary: item.summary,
                    MainMenu: '560000000000000000000002',
                    Menus: [],
                    MainPhoto: null,
                    MainVideo: null,
                    content: item.description,
                    Photos: [],
                    Videos: [],
                    freeContent: null,
                    startedAt: newsPubDate,
                    type: 'NEWS',
                    status: 'RELEASE',
                    traceCode: null,
                    isAdult: false,
                    isDeliver: false,
                    isSponsored: false,
                    Author: '530000000000000000000002',
                    newsBy: '鉅亨網',
                    Tags: [],
                    isFeed: true,
                    feedFrom: 'CNYES',
                    LastReviewer: '530000000000000000000002',
                    isTrashed: false,
                    CreatedBy: '530000000000000000000002',
                    UpdatedBy: '530000000000000000000002',
                    createdAt: newsPubDate,
                    updatedAt: newsPubDate
                });
            });

            if(newsList.length === 0) {
                console.log('沒有資料匯入');
                return;
            }

            // 這邊要存入 news 的資料庫
            await News.createAsync(newsList);
            console.log(`總共匯入: ${newsList.length} 筆資料`);

            debug('news list = %j', newsList);
            return;
        } catch (err) {
            return console.log(err);
        }
    },
    start: true,
    runOnInit: true
});