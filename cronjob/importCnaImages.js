/*
 * TIPS: 增加這種接收 rss feed 的服務時，記得要去 initData/users.js 與 initData/menus.js 增加對應的 user 與 menu
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:importCnaImages');

import config from 'config';
import cron from 'cron';
import _ from 'lodash';
import { parseRssFeed } from '../libs';
import { Image } from '../models';
module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 */3 * * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            console.log(`------------- Start Import 中央社 圖片 -------------`);
            let feedUrl = config.get('general.rssFeed.cnaImage');

            if(!feedUrl || feedUrl === '') {
                console.log('cnaImage 中央社 圖片沒有設定');
                return;
            }

            let rssJSON = await parseRssFeed(feedUrl);
            //因中央社圖片XML的結構會依時間有變更 所以這樣指定值 詳見NOWnews-api Gitgub issue #652
            let imageList =
                _.get(rssJSON, 'NewsML.NewsItem[0].NewsComponent.NewsComponent.NewsComponent', null) ||
                _.get(rssJSON, 'NewsML.NewsItem.NewsComponent.NewsComponent.NewsComponent', null);

            if(!imageList){
                console.error('中央社團片 解析XML後沒有圖片列表！！');
                return;
            }

            debug('中央社 imageList = %j', imageList);

            for(let image of  imageList){
                let href = _.get(image, 'NewsComponent.NewsComponent[0].ContentItem.Href', null);
                let title = _.get(image, 'NewsComponent.NewsComponent[1].ContentItem.DataContent.p[0]', '');
                let desc = _.get(image, 'NewsComponent.NewsComponent[1].ContentItem.DataContent.p[1]', '');
                let mimeType = _.get(image, 'NewsComponent.NewsComponent[0].ContentItem.MimeType.FormalName', null);
                // 如果xml結構找出來沒有href 就不收錄
                if(!href){
                  continue;
                }
                // 如果這張圖片已經存過了 之後的就都不收錄 因為這資料有按照順序時間排
                let aliveImage = await Image.findOne()
                    .where('url').equals(href)
                    .execAsync();
                if(aliveImage) {
                  break;
                }

                let imageOptions = {
                    title: title,
                    desc: '▲' + desc,
                    keyword: '中央社',
                    imageFrom: 'CNA',
                    originalname: null,
                    format: null,
                    type: 'NEWS',
                    mode: 'NORMAl',
                    mimetype: mimeType,
                    width: null,
                    height: null,
                    isDeliver: false,
                    Tag: null,
                    url: href,
                    isTrashed: false,
                    CreatedBy: '530000000000000000000004',
                    UpdatedBy: '530000000000000000000004',
                };

                image = await Image.createAsync(imageOptions);
                console.log(`匯入中央社圖片URL: ${href}`);
                console.log(`匯入中央社圖片title: ${title}`);
                console.log(`-------------------------------------------`);
            }

            console.log(`------------- Finish Import 中央社 圖片 -------------`);
        } catch (err) {
            return console.log(err);
        }
    },
    start: false,
    runOnInit: true
});
