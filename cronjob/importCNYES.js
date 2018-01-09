/*
 * TIPS: 增加這種接收 rss feed 的服務時，記得要去 initData/users.js 與 initData/menus.js 增加對應的 user 與 menu
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:importCNYES');
import Promise from 'bluebird';
import config from 'config';
import cron from 'cron';
import _ from 'lodash';
import moment from 'moment-timezone';
import { parseRssFeed, newsLog, changeInternalLink } from '../libs';
import { News, Image, Tag } from '../models';
import { Pageview } from '../pvModels';
import elasticsearch from '../elasticsearch';

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 */3 * * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            console.log(`------------- Start Import 鉅亨網 RSS Feed -------------`);
            let feedUrl = config.get('general.rssFeed.cnyes');

            if(!feedUrl || feedUrl === '') {
                console.log('cnyes 鉅亨網沒有設定');
                return;
            }

            let rssJSON = await parseRssFeed(feedUrl);

            // debug('json = %j', rssJSON.rss.channel.item[0]);

            let newsList = [];
            let nowTime = moment.tz('Asia/Taipei');
            let prevTime = moment.tz('Asia/Taipei').add(-10, 'm');
            for(let item of  rssJSON.rss.channel.item){

                // 如果不是在設定的時間區間內的新聞，就不需要收錄
                let newsPubDate = moment.tz(new Date(item.pubDate), 'Asia/Taipei');
                if( newsPubDate.isBefore(prevTime) ) {
                    continue;
                }

                // 確認對方給的新聞 url 是否符合規範，不符合規範就不收錄
                let regexString = /^(http|https):\/\/news.cnyes.com\/news\/id\/[0-9]+/;
                if(item.link.match(regexString) === null) {
                    continue;
                }

                // 取出對方新聞 uniq key
                let splitLink = item.link.split('/');
                let uniqKey = splitLink[splitLink.length - 1];

                // 處理標題或是短標題多於限制的字數，就把它截掉
                let title = item.title.slice(0, 25);
                let shortTitle = title.length > 16 ? title.slice(0, 13) + '...' : title.slice(0, 15);

                // 如果這則新聞已經存過了，就不收錄
                let aliveNews = await News.findOne()
                    .where('feedUniqKey').equals(uniqKey)
                    .execAsync();
                if(aliveNews) {
                    continue;
                }
                //把內文的內連都改連回首頁
                item['content:encoded'] = changeInternalLink(item['content:encoded']);
                //鉅亨網要求加上在新聞內文 文末加上連結
                const link = "http://news.cnyes.com/?utm_medium=news&utm_source=nownews";
                item['content:encoded'] +=`\n更多精彩內容請至 《鉅亨網》 <a target="_blank" href="${link}">連結>></a>`

                //新聞關鍵字
                var keywords = item['media:keywords'] ? item['media:keywords'].split(',') : [];
                let tagList = await Promise.mapSeries(keywords, (tag) => {
                    // 變成小寫與去除頭尾空白
                    tag = tag.trim().toLowerCase();
                    return Tag.findOne()
                        .where('name').equals(tag)
                        .where('isTrashed').equals(false)
                        .execAsync()
                        .then((aliveTag) => {

                            // 如果有存在的 tag 就直接吐出去
                            if(aliveTag) {
                                return Promise.resolve(aliveTag);
                            }

                            // 沒有這個 tag 就幫他建立
                            return Tag.createAsync({
                                name: tag,
                                CreatedBy: '530000000000000000000002',
                                UpdatedBy: '530000000000000000000002'
                            });
                        });
                });

                /*
                 * 鉅亨網沒有圖片，所以不用處理
                 * 這些處理圖片的 code 留下來當參考
                 */
                // let image = null;
                // if(item['media:content']) {
                //     let imageOptions = {
                //         title: '（圖／鉅亨網）',
                //         desc: '（圖／鉅亨網）',
                //         keyword: '鉅亨網',
                //         imageFrom: 'CNYES',
                //         originalname: null,
                //         format: null,
                //         type: 'NEWS',
                //         mode: 'NORMAl',
                //         mimetype: null,
                //         width: item['media:content'].width,
                //         height: item['media:content'].height,
                //         isDeliver: false,
                //         Tag: null,
                //         url: item['media:content'] && item['media:content'].url,
                //         isTrashed: false,
                //         CreatedBy: '530000000000000000000002',
                //         UpdatedBy: '530000000000000000000002',
                //     };

                //     image = await Image.createAsync(imageOptions);
                // }

                console.log(`新聞標題: ${item.title}`);
                console.log(`新聞短標題: ${shortTitle}`);
                console.log(`新聞關鍵字:${keywords}`);
                console.log(`新聞連結: ${item.link}`);
                console.log(`新聞識別唯一值: ${uniqKey}`);
                console.log(`新聞發布時間: ${newsPubDate.format('YYYY-MM-DD HH:ss:mm')}`);
                console.log(`收錄時間區間: ${prevTime.format('YYYY-MM-DD HH:ss:mm')} ~ ${nowTime.format('YYYY-MM-DD HH:ss:mm')}`);
                console.log(`-------------------------------------------`);

                // 鉅亨網完全沒有圖片 全部主圖都隨機從這4個墊檔圖指定
                const cnyesImagesObjectIds = [
                  '511000000000000000000005',
                  '511000000000000000000006',
                  '511000000000000000000007',
                  '511000000000000000000008',
                ];
                let randomDefaultImageId = cnyesImagesObjectIds[Math.floor(Math.random() * cnyesImagesObjectIds.length)];

                let newsOptions = {
                    title: title,
                    location: [121.5914087,25.0693482], //台北市內湖區的座標
                    shortTitle: shortTitle,
                    summary: title, //鉅亨網沒有提供summary這個欄位 但前台og tag要用到summary 所以放title
                    MainMenu: '560000000000000000000013',
                    Menus: ['560000000000000000000013'],
                    MainPhoto: randomDefaultImageId,
                    MainVideo: null,
                    content: item['content:encoded'],
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
                    Tags: tagList || [],
                    isFeed: true,
                    feedFrom: 'CNYES',
                    feedUniqKey: uniqKey,
                    feedUrl: item.link,
                    LastReviewer: '530000000000000000000002',
                    isTrashed: false,
                    CreatedBy: '530000000000000000000002',
                    UpdatedBy: '530000000000000000000002',
                    createdAt: newsPubDate,
                    updatedAt: newsPubDate
                };

                let news = await News.createAsync(newsOptions);

                // 處理 log
                let newsForLog = await news.populate('MainMenu Menus MainPhoto MainVideo Photos Videos Author Tags LastReviewer CreatedBy UpdatedBy').execPopulate();
                await newsLog(newsForLog, 'CREATE');
                await elasticsearch.create(newsForLog);

                // 初始化 pageview 資訊
                await Pageview.findOneAndUpdateAsync({
                        url: `/news/${moment.tz(news.startedAt, 'Asia/Taipei').format('YYYYMMDD')}/${news.sn}`
                    }, {
                        $set: { newsId: news._id, menuId: news.MainMenu._id }
                    }, {
                        upsert: true,
                        new: true,
                        setDefaultsOnInsert: true
                    });
            };

            console.log(`------------- Finish Import 鉅亨網 RSS Feed -------------`);
        } catch (err) {
            return console.log(err);
        }
    },
    start: false,
    runOnInit: true
});
