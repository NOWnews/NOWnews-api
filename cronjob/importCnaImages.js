/*
 * TIPS: 增加這種接收 rss feed 的服務時，記得要去 initData/users.js 與 initData/menus.js 增加對應的 user 與 menu
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:cron:cronjob:importCnaImages');

import config from 'config';
import cron from 'cron';
import _ from 'lodash';
import { parseRssFeed, downloadFile } from '../libs';
import { Image } from '../models';
import moment from 'moment-timezone';
import mongoose from 'mongoose';
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


                let downloadedFilePath = await downloadFile(href);

                // 讀取檔案的前 4100 bytes 存成 buffer
                let buffer = readChunk.sync(downloadedFilePath, 0, 4100);
                let { ext } = fileType(buffer);

                // 編輯新的名字與 ObjectId
                let objectId = mongoose.Types.ObjectId();
                let now = moment.tz('Asia/Taipei').format('YYYYMMDDHHmm');
                let newName = `${objectId}_${now}.${ext}`;
                let newPath = `uploads/${newName}`;

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
                            debug(file);
                            return Promise.resolve(file);
                        })
                ]);

                // 如果這張圖片已經存過了 之後的就都不收錄 因為這資料有按照順序時間排
                let aliveImage = await Image.findOne()
                    .where('originalname').equals(href)
                    .execAsync();
                if(aliveImage) {
                  break;
                }


                let imageOptions = {
                    title: title,
                    desc: desc,
                    keyword: '中央社',
                    imageFrom: 'CNA',
                    originalname: href,
                    format: null,
                    type: 'NEWS',
                    mode: 'NORMAl',
                    mimetype: mimeType,
                    width: null,
                    height: null,
                    isDeliver: false,
                    Tag: null,
                    url: `${config.get('admin.imageServer.url')}/${newName}`,
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
            return console.error(err);
        }
    },
    start: false,
    runOnInit: true
});
