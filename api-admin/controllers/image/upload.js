
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:image:upload');

import readChunk from 'read-chunk';
import fileType from 'file-type';
import gm from 'gm';
import fs from 'fs';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
import config from 'config';
import imageServer from 'scp2';
import md5File from 'md5-file/promise';

import googleCloud from 'google-cloud';
const gcloud = googleCloud({
    projectId: config.get('general.googleCloud.projectId'),
    keyFilename: config.get('general.googleCloud.keyFilename'),
    promise: Promise
});
const gcs = gcloud.storage();
const bucket = gcs.bucket(config.get('general.googleCloud.storageBucket'));

import { Image } from '../../../models';

module.exports = async(req, res, next) => {
    try{


        let { title, desc, keyword, type, isDeliver, Tag, CreatedBy } = req.body;
        let { path, mimetype, originalname } = req.file;
        let compression = false;
        let image = gm(path);

        // 用 gm 去讀取圖片的長寬
        let { width: originWidth, height: originHeight } = await new Promise((resolve, reject) => {
                image.size((err, size) => {
                    if(err) {
                        return reject(err);
                    }
                    return resolve(size);
                });
            });



        // 大於 1600 且有浮水印
        if(req.body.isWatermark && originWidth && originWidth > 1600) {
            console.log(`image name "${originalname}" origin width = ${originWidth} px`);
            compression = true;
            image
                .resize(1080, null)
                .command('composite')
                .in('-gravity', 'SouthEast')
                .in('-geometry', '+15 +15')
                .in('source/nownews_watermark.png');
        }

        // 大於 1600 但是沒有浮水印
        if(!req.body.isWatermark && originWidth && originWidth > 1600) {
            console.log(`image name "${originalname}" origin width = ${originWidth} px`);
            compression = true;
            image
                .resize(1600, null);
        }

        // 小於 1600 但是有浮水印
        if(req.body.isWatermark && originWidth && originWidth < 1600) {
            compression = true;
            image
                .resize(1080, null)
                .command('composite')
                .in('-gravity', 'SouthEast')
                .in('-geometry', '+15 +15')
                .in('source/nownews_watermark.png');
        }


        if(compression === true) {
            await new Promise((resolve, reject) => {
                image
                    .write(path, (err, stdout, stderr, command) => {
                        if (err){
                            return reject(err);
                        }
                        return resolve({});
                    });
            });
        }

        // 讀取檔案的前 4100 bytes 存成 buffer
        let buffer = readChunk.sync(path, 0, 4100);

        let { ext } = fileType(buffer);

        // 這段是因為我們要上傳原生圖片廣告給 NOWlink 用，需要知道 md5
        let md5hash = await md5File(path);
        console.log(`${originalname} md5 is: ${md5hash}`);

        // 用 gm 去讀取圖片的長寬
        let { width, height } = await new Promise((resolve, reject) => {
                image.size((err, size) => {
                    if(err) {
                        return reject(err);
                    }
                    return resolve(size);
                });
            });

        // 編輯新的名字與 ObjectId
        let objectId = mongoose.Types.ObjectId();
        let now = moment.tz('Asia/Taipei').format('YYYYMMDDHHmm');
        let newName = `${objectId}_${now}.${ext}`;
        let newPath = `uploads/${newName}`;

        // 將圖片名稱換掉
        fs.renameSync(path, newPath);

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

        // 組成要儲存的資料
        let options = {
            _id: objectId,
            title,
            desc,
            keyword,
            imageFrom: 'INTERNAL',
            format: ext,
            originalname,
            mimetype,
            type,
            isDeliver: isDeliver === 'true' ? true : false,
            Tag,
            width: width,
            height: height,
            // url: `http://35.190.31.67/images/${newName}`,
            url: `${config.get('admin.imageServer.url')}/${newName}`,
            CreatedBy,
            UpdatedBy: CreatedBy
        };
        debug('options = %j', options);

        // 儲存新檔案
        let newImage = await Image.createAsync(options);
        debug('newImage = %j', newImage);

        // 刪掉檔案
        await new Promise((resolve, reject) => {
            fs.unlink(newPath, (err, result) => {
                if(err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });

        return res.json(newImage);
    } catch (err) {
        return next(err);
    };
};