/*
 * TIPS: 增加這種接收 rss feed 的服務時，記得要去 initData/users.js 與 initData/menus.js 增加對應的 user 與 menu
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:importMNA');

import config from 'config';
import cron from 'cron';
import _ from 'lodash';
import moment from 'moment-timezone';
import { parseRssFeed, newsLog, changeInternalLink, getAndRemoveFirstImage } from '../libs';
import { News, Image } from '../models';
import { Pageview } from '../pvModels';
import request from 'request-promise';
import { downloadFile } from '../libs';
import mongoose from 'mongoose';
import fs from 'fs';
import readChunk from 'read-chunk';
import fileType from 'file-type';
import imageServer from 'scp2';
import googleCloud from 'google-cloud';
const gcloud = googleCloud({
    projectId: config.get('general.googleCloud.projectId'),
    keyFilename: config.get('general.googleCloud.keyFilename'),
    promise: Promise
});
const gcs = gcloud.storage();
const bucket = gcs.bucket(config.get('general.googleCloud.storageBucket'));

module.exports = new cron.CronJob({
    /* 設定多久跑一次
    * 軍聞社新聞更新頻率一天一次
    * 故設定每2小時檢查一次且檢查2天以內的新聞
    */
    cronTime: '0 0 */2 * * *',

    // 主要邏輯區
    onTick: async () => {
        try {
            console.log(`------------- Start Import 軍聞社 RSS Feed -------------`);
            let feedUrl = config.get('general.rssFeed.mna');

            if(!feedUrl || feedUrl === '') {
                console.log('軍聞社 feed URL 沒有設定');
                return;
            }

            let rssJSON = await parseRssFeed(feedUrl);
            // debug('json = %j', rssJSON.rss.channel.item[0]);

            let newsList = [];
            let nowTime = moment.tz('Asia/Taipei');
            let prevTime = moment.tz('Asia/Taipei').add(-2, 'day');
            for(let item of  rssJSON.rss.channel.item){

                // 如果不是在設定的時間區間內的新聞，就不需要收錄
                let newsPubDate = moment.tz(new Date(item.pubDate), 'Asia/Taipei');
                if( newsPubDate.isBefore(prevTime) ) {
                    continue;
                }

                // 確認對方給的新聞 url 是否符合規範，不符合規範就不收錄

                let regexString = /^(http|https):\/\/mna.gpwb.gov.tw\/post.php\?id=/;
                if(item.link.match(regexString) === null) {
                    continue;
                }

                // 取出對方新聞 uniq key
                let uniqKey = item.guid;

                // 處理標題或是短標題多於限制的字數，就把它截掉
                let title = item.title.slice(0, 26);
                let shortTitle = item.title.slice(0, 16);
                // 如果這則新聞已經存過了，就不收錄
                let aliveNews = await News.findOne()
                    .where('feedUniqKey').equals(uniqKey)
                    .execAsync();

                if(aliveNews) {
                   continue;
                }

                //新聞內容如果有內連的話 都改成我們首頁
                item.description = changeInternalLink(item.description);

                //如果內文有圖片 把第一個圖片移除 並取出當作主圖
                let { firstImage, htmlContent } = getAndRemoveFirstImage(item.description);

                item.description = htmlContent;
                item.description += `新聞來源:國防部軍事新聞通訊社`;

                let mainPhoto = null;
                const mnaImagesObjectIds = [
                  '511000000000000000000002',
                  '511000000000000000000003',
                  '511000000000000000000004'
                ];
                let randomDefaultImageId = mnaImagesObjectIds[Math.floor(Math.random() * mnaImagesObjectIds.length)];

                let aliveImage = firstImage ? await Image.findOne()
                    .where('originalname').equals(firstImage.src)
                    .execAsync() : false;

                //存圖片前 先確認軍聞社提供的圖片是正常的 因為他們會提供錯誤的URL 打過去會回傳html
                let isImage = false;
                if( firstImage && !aliveImage){
                    let imgRes = await request({
                        method: 'GET',
                        uri: firstImage.src,
                        resolveWithFullResponse: true
                    });
                    if(imgRes.statusCode === 200 && imgRes.headers['content-length'] > 0 && imgRes.headers['content-type'].startsWith('image')){
                        isImage = true;
                    }
                }


                if( firstImage && isImage && !aliveImage ){

                    let downloadedFilePath = await downloadFile(firstImage.src);

                    // 讀取檔案的前 4100 bytes 存成 buffer
                    let buffer = readChunk.sync(downloadedFilePath, 0, 4100);
                    let { ext } = fileType(buffer);

                    // 編輯新的名字與 ObjectId
                    let objectId = mongoose.Types.ObjectId();
                    let now = moment.tz('Asia/Taipei').format('YYYYMMDDHHmm');
                    let newName = `${objectId}_${now}.${ext}`;
                    let newPath = `uploads/${newName}`;

                    // 將圖片名稱換掉
                    fs.renameSync(downloadedFilePath, newPath);

                    // scp 到 img.nownews.com 圖床與 google cloud storage
                    let [ imageStorage, cloud ] = await Promise.all([
                        new Promise((resolve, reject) => {
                                let username = config.get('admin.imageServer.username');
                                let password = config.get('admin.imageServer.password');
                                let host = config.get('admin.imageServer.host');
                                let folder = config.get('admin.imageServer.folder');
                                let port = config.get('admin.imageServer.port');
                                let scpCommand = `${username}:${password}@${host}:${port}:${folder}`;

                                imageServer.scp(newPath, scpCommand, (err) => {
                                    if(err) {
                                        return reject(err);
                                    }
                                    return resolve('ok');
                                });
                            }),
                        bucket.upload(newPath, {
                                destination: `images/${newName}`,
                                public: true
                            })
                            .then((file) => {
                                return Promise.resolve(file);
                            })
                    ]);

                    let newFileUrl = `${config.get('admin.imageServer.url')}/${newName}`;

                    let imageOptions = {
                        title: firstImage.alt || '（圖／軍聞社）',
                        desc: '▲ ' + firstImage.alt || '▲ （圖／軍聞社）',
                        keyword: '軍聞社',
                        imageFrom: 'MNA',
                        originalname: firstImage.src,
                        format: null,
                        type: 'NEWS',
                        mode: 'NORMAl',
                        mimetype: null,
                        width: firstImage.width || null,
                        height: null,
                        isDeliver: false,
                        Tag: null,
                        url: newFileUrl,
                        isTrashed: false,
                        CreatedBy: '530000000000000000000005',
                        UpdatedBy: '530000000000000000000005',
                    };

                    mainPhoto = await Image.createAsync(imageOptions);

                    // 刪掉檔案
                    await new Promise((resolve, reject) => {
                        fs.unlink(newPath, (err, result) => {
                            if(err) {
                                return reject(err);
                            }
                            return resolve(result);
                        });
                    });
                }


                console.log(`------------------軍聞社--------------------`);
                console.log(`收錄新聞: ${item.title}`);
                console.log(`新聞連結: ${item.link}`);
                console.log(`新聞識別唯一值: ${uniqKey}`);
                console.log(`新聞發布時間: ${newsPubDate.format('YYYY-MM-DD HH:ss:mm')}`);
                console.log(`收錄時間區間: ${prevTime.format('YYYY-MM-DD HH:ss:mm')} ~ ${nowTime.format('YYYY-MM-DD HH:ss:mm')}`);
                console.log(`-------------------------------------------`);

                let newsOptions = {
                    title: title,
                    location: [121.5914087,25.0693482], //台北市內湖區的座標
                    shortTitle: shortTitle,
                    summary: item.item || title,
                    MainMenu: '560000000000000000000001', //政治
                    Menus: ['5952deb29413e266c5ddad41'], //國防軍武
                    MainPhoto: aliveImage ? aliveImage._id : ( mainPhoto ?  mainPhoto._id : randomDefaultImageId ),
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
                    Author: '530000000000000000000005',
                    newsBy: '軍聞社',
                    Tags: [],
                    isFeed: true,
                    feedFrom: 'MNA',
                    feedUniqKey: uniqKey,
                    feedUrl: item.link,
                    LastReviewer: '530000000000000000000005',
                    isTrashed: false,
                    CreatedBy: '530000000000000000000005',
                    UpdatedBy: '530000000000000000000005',
                    createdAt: newsPubDate,
                    updatedAt: newsPubDate
                };

                let news = await News.createAsync(newsOptions);

                // 處理 log
                let newsForLog = await news.populate('MainMenu Menus MainPhoto MainVideo Photos Videos Author Tags LastReviewer CreatedBy UpdatedBy').execPopulate();
                await newsLog(newsForLog, 'CREATE');

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
            console.log(`------------- Finish Import 軍聞社 RSS Feed -------------`);
        } catch (err) {
            return console.log(err);
        }
    },
    start: false,
    runOnInit: true
});
