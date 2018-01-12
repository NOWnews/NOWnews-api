/*
 * TIPS: 增加這種接收 rss feed 的服務時，記得要去 initData/users.js 與 initData/menus.js 增加對應的 user 與 menu
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:importPLAYNOW');
import Promise from 'bluebird';
import config from 'config';
import cron from 'cron';
import cheerio from 'cheerio';
import _ from 'lodash';
import moment from 'moment-timezone';
import { parseRssFeed, newsLog } from '../libs';
import { News, Image, Tag } from '../models';
import { Pageview } from '../pvModels';
import elasticsearch from '../elasticsearch';

// feed info
const feedName = 'PLAYNOW';
const feedFrom = 'PLAYNOW';
const CreateUser = '530000000000000000000007';
const feedUrl = config.get('general.rssFeed.playNow');
const MainMenu = '560000000000000000000003';
const MenuIds = ['5952d5d19c2d7166cb9511df'];

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 */3 * * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            console.log(`------------- Start Import ${feedName} RSS Feed -------------`);

            if(!feedUrl || feedUrl === '') {
                console.log(`${feedName}沒有設定`);
                return;
            }
            let image = null;
            let rssJSON = await parseRssFeed(feedUrl);

            // debug('json = %j', rssJSON.rss.channel.item[0]);

            let newsList = [];
            let nowTime = moment.tz('Asia/Taipei');
            let prevTime = moment.tz('Asia/Taipei').add(-10, 'm');
            for(let item of rssJSON.rss.channel.item){

                // 如果不是在設定的時間區間內的新聞，就不需要收錄 #######
                let newsPubDate = moment.tz(new Date(item.pubDate), 'Asia/Taipei');
                // if( newsPubDate.isBefore(prevTime) ) {
                //     continue;
                // }

                // 確認對方給的新聞 url 是否符合規範，不符合規範就不收錄
                let regexString = /^(http|https):\/\/playnow.nownews.com\//;
                if(item.link.match(regexString) === null) {
                    continue;
                }

                // 取出對方新聞 uniq key
                let uniqKey = item.guid['$t'];

                // 處理標題或是短標題多於限制的字數，就把它截掉
                let title = item.title.slice(0, 25);
                let shortTitle = title.length > 16 ? title.slice(0, 13) + '...' : title.slice(0, 15);

                // 如果這則新聞已經存過了，就不收錄
                let aliveNews = await News.findOne()
                    .where('feedUniqKey').equals(uniqKey)
                    .execAsync();
                if(aliveNews) {
                    debug('不收錄原因: 已存過');
                    continue;
                }

                //在新聞內文 文末加上連結
                const link = item['link'];
                item['content:encoded'] +=`\n更多精彩內容請至 《${feedName}》 <a target="_blank" href="${link}">連結>></a>`

                //新聞關鍵字
                var keywords = item['tags'] ? item['tags'] : [];
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
                                CreatedBy: CreateUser,
                                UpdatedBy: CreateUser
                            });
                        });
                });

                /*
                 * 處理圖片部分
                 */
                if(item['enclosure']) {
                    let imageOptions = {
                        title: `（圖／${feedName}）`,
                        desc: `${item.title}（圖／${feedName}）`,
                        keyword: `${feedName}`,
                        imageFrom: feedFrom,
                        originalname: null,
                        format: null,
                        type: 'NEWS',
                        mode: 'NORMAl',
                        mimetype: item['enclosure'].type,
                        width: null,
                        height: null,
                        isDeliver: false,
                        Tag: null,
                        url: item['enclosure'].url,
                        isTrashed: false,
                        CreatedBy: CreateUser,
                        UpdatedBy: CreateUser,
                    };

                    image = await Image.createAsync(imageOptions);
                }

                console.log(`新聞標題: ${item.title}`);
                console.log(`新聞短標題: ${shortTitle}`);
                console.log(`新聞主分類:${MainMenu}`);
                console.log(`新聞次分類:${MenuIds}`);
                console.log(`新聞簡介:${item.description}`);
                console.log(`新聞關鍵字:${keywords}`);
                console.log(`新聞圖片:${image.url}`);
                console.log(`新聞連結: ${item.link}`);
                console.log(`新聞識別唯一值: ${uniqKey}`);
                console.log(`新聞發布時間: ${newsPubDate.format('YYYY-MM-DD HH:ss:mm')}`);
                console.log(`收錄時間區間: ${prevTime.format('YYYY-MM-DD HH:ss:mm')} ~ ${nowTime.format('YYYY-MM-DD HH:ss:mm')}`);
                console.log(`-------------------------------------------`);

                let newsOptions = {
                    title: title,
                    location: [121.5914087,25.0693482], //台北市內湖區的座標
                    shortTitle: shortTitle,
                    summary: item.description || title, //分眾頻道可能沒有提供summary這個欄位 但前台og tag要用到summary 所以放title
                    MainMenu: MainMenu,
                    Menus: MenuIds,
                    MainPhoto: image.id,
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
                    Author: CreateUser,
                    newsBy: `${feedName}`,
                    Tags: tagList || [],
                    isFeed: true,
                    feedFrom: feedFrom,
                    feedUniqKey: uniqKey,
                    feedUrl: item.link,
                    LastReviewer: CreateUser,
                    isTrashed: false,
                    CreatedBy: CreateUser,
                    UpdatedBy: CreateUser,
                    createdAt: nowTime,
                    updatedAt: nowTime
                };
                let news = await News.createAsync(newsOptions);

                // 處理 log
                let newsForLog = await news.populate('MainMenu Menus MainPhoto MainVideo Photos Videos Author Tags LastReviewer CreatedBy UpdatedBy').execPopulate();
                await newsLog(newsForLog, 'CREATE');

                // 測試會出錯，因此用非同步了略過他
                elasticsearch.create(newsForLog);


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

            console.log(`------------- Finish Import ${feedName} RSS Feed -------------`);
        } catch (err) {
            return console.log(err);
        }
    },
    start: false,
    runOnInit: true
});
