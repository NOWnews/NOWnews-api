/*
 * TIPS: 增加這種接收 rss feed 的服務時，記得要去 initData/users.js 與 initData/menus.js 增加對應的 user 與 menu
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:importCnaNews');
import Promise from 'bluebird';
import config from 'config';
import cron from 'cron';
import _ from 'lodash';
import moment from 'moment-timezone';
import { parseRssFeed, newsLog, changeInternalLink } from '../libs';
import { News, Image, Tag } from '../models';
import { Pageview } from '../pvModels';

module.exports = new cron.CronJob({
    // 設定多久跑一次
    cronTime: '0 */3 * * * *',

    // 主要邏輯區
    onTick: async() => {
        try {
            console.log(`------------- Start Import 中央社 RSS Feed -------------`);
            let feedUrls = config.get('general.rssFeed.cnaNews');

            if (!feedUrls || feedUrls === '') {
                console.error('中央社 RSS Feed 沒有設定');
                return;
            }
            let feedUrlsAndImages = {
                business: {
                    feedUrls: feedUrls.business,
                    defaultImageIds: ['511000000000000000000009']
                },
                china: {
                    feedUrls: feedUrls.china,
                    defaultImageIds: ['511000000000000000000010']
                },
                health: {
                    feedUrls: feedUrls.health,
                    defaultImageIds: ['511000000000000000000011']
                },
                int: {
                    feedUrls: feedUrls.int,
                    defaultImageIds: ['511000000000000000000012']
                },
                life: {
                    feedUrls: feedUrls.life,
                    defaultImageIds: ['511000000000000000000013']
                },
                local: {
                    feedUrls: feedUrls.local,
                    defaultImageIds: ['511000000000000000000014']
                },
                politics: {
                    feedUrls: feedUrls.politics,
                    defaultImageIds: ['511000000000000000000015']
                },
                society: {
                    feedUrls: feedUrls.society,
                    defaultImageIds: ['511000000000000000000016']
                },
                sports: {
                    feedUrls: feedUrls.sports,
                    defaultImageIds: ['511000000000000000000017']
                },
                stars: {
                    feedUrls: feedUrls.stars,
                    defaultImageIds: ['511000000000000000000018']
                },
                tech: {
                    feedUrls: feedUrls.tech,
                    defaultImageIds: ['511000000000000000000019']
                }
            };

            for (let [categoryName, category] of Object.entries(feedUrlsAndImages)) {
                console.log(`---- 開始匯入 中央社 ${categoryName} 分類 ----`);
                let {
                    feedUrls,
                    defaultImageIds
                } = category;

                for (let [index, feedUrl] of feedUrls.entries()) {

                    let rssJSON = await parseRssFeed(feedUrl);
                    let newsList = _.get(rssJSON, 'NewsML.NewsItem', null);

                    console.log(`中央社 ${categoryName}[${index}] 分類 共有 ${newsList.length} 筆新聞`);

                    let nowTime = moment.tz('Asia/Taipei');
                    let prevTime = moment.tz('Asia/Taipei').add(-1, 'day');

                    for (let [index, value] of newsList.entries()) {

                        console.log(`${categoryName} 第 ${index} 筆新聞:`);

                        let news = {
                            title: _.get(value, 'NewsComponent.NewsComponent.NewsComponent.ContentItem.DataContent.nitf.body["body.head"].hedline.hl1', null), // hedline 沒有打錯字 應該是中央社的技術人員手誤
                            content: _.get(value, 'NewsComponent.NewsComponent.NewsComponent.ContentItem.DataContent.nitf.body["body.content"].p', null),
                            uniqKey: _.get(value, 'NewsComponent.Duid', null),
                            pubDate: _.get(value, 'NewsComponent.NewsComponent.DateLine', null),
                            desc: _.get(value, 'NewsComponent.NewsComponent.NewsComponent.NewsLines.SlugLine', null)
                        };
                        // 沒有取得 標題 內容 識別值 日期，就不需要收錄
                        if (!news.title || !news.content || !news.uniqKey || !news.pubDate) {
                            debug('不收錄原因: 新聞資料不完整');
                            continue;
                        }
                        // 如果不是在設定的時間區間內的新聞，就不需要收錄
                        news.pubDate = moment.tz(news.pubDate, 'Asia/Taipei');
                        if (news.pubDate.isBefore(prevTime)) {
                            debug('不收錄原因: 新聞過期');
                            continue;
                        }
                        //如果這則新聞已經存過 整個newslist就直接跳過不收錄 因為newsList是有按照時間順序 由新到舊
                        let aliveNews = await News.findOne()
                            .where('feedUniqKey').equals(news.uniqKey)
                            .execAsync();
                        if (aliveNews) {
                            debug('不收錄原因: 已存過');
                            break;
                        }

                        // 處理標題或是短標題多於限制的字數，就把它截掉
                        news.title = news.title.slice(0, 25);
                        news.shortTitle = news.title.length > 16 ? news.title.slice(0, 13) + '...' : news.title.slice(0, 15);

                        // 中央社的內文比較特別 parseXML的時候  變成array了 現在把內文要組回來
                        let contentTemp = '';
                        _.forEach(news.content, value => {
                            contentTemp += `<p>${value}</p>`
                        });
                        news.content = contentTemp;

                        //把內文的內連都改連回首頁
                        news.content = changeInternalLink(news.content);

                        console.log(`新聞標題: ${news.title}`);
                        console.log(`新聞短標題: ${news.shortTitle}`);
                        console.log(`新聞識別唯一值: ${news.uniqKey}`);
                        console.log(`新聞發布時間: ${news.pubDate.format('YYYY-MM-DD HH:ss:mm')}`);
                        console.log(`收錄時間區間: ${prevTime.format('YYYY-MM-DD HH:ss:mm')} ~ ${nowTime.format('YYYY-MM-DD HH:ss:mm')}`);
                        console.log(`-------------------------------------------`);

                        let randomImageId = defaultImageIds[Math.floor(Math.random() * defaultImageIds.length)];

                        let newsOptions = {
                            title: news.title,
                            location: [121.5914087, 25.0693482], //台北市內湖區的座標
                            shortTitle: news.shortTitle,
                            summary: news.desc || news.title,
                            MainMenu: '560000000000000000000001',
                            Menus: ['560000000000000000000014'],
                            MainPhoto: randomImageId,
                            MainVideo: null,
                            content: news.content,
                            Photos: [],
                            Videos: [],
                            freeContent: null,
                            startedAt: news.pubDate,
                            type: 'NEWS',
                            status: 'RELEASE',
                            traceCode: null,
                            isAdult: false,
                            isDeliver: false,
                            isSponsored: false,
                            Author: '530000000000000000000004',
                            newsBy: '中央社',
                            Tags: [],
                            isFeed: true,
                            feedFrom: 'CNA',
                            feedUniqKey: news.uniqKey,
                            feedUrl: feedUrl,
                            LastReviewer: '530000000000000000000004',
                            isTrashed: false,
                            CreatedBy: '530000000000000000000004',
                            UpdatedBy: '530000000000000000000004',
                            createdAt: Date.now(),
                            updatedAt: Date.now()
                        };
                        news = await News.createAsync(newsOptions);
                        // 處理 log
                        let newsForLog = await news.populate('MainMenu Menus MainPhoto MainVideo Photos Videos Author Tags LastReviewer CreatedBy UpdatedBy').execPopulate();
                        await newsLog(newsForLog, 'CREATE');

                        // 初始化 pageview 資訊
                        await Pageview.findOneAndUpdateAsync({
                            url: `/news/${moment.tz(news.startedAt, 'Asia/Taipei').format('YYYYMMDD')}/${news.sn}`
                        }, {
                            $set: {
                                newsId: news._id,
                                menuId: news.MainMenu._id
                            }
                        }, {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true
                        });
                    };
                }
            }
            console.log(`------------- Finish Import 中央社 RSS Feed -------------`);
        } catch (err) {
            return console.log(err);
        }
    },
    start: false,
    runOnInit: true
});
