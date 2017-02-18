
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:image:upload');

import gm from 'gm';
import fs from 'fs';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
import config from 'config';
import imageServer from 'scp2';

import { Image } from '../../../models';

module.exports = async(req, res, next) => {

    let { keyword, title, desc, type, isDeliver, CreatedBy } = req.body;
    let { path, mimetype, originalname } = req.file;

    try{

        // 用 gm 去讀取圖片的基本資訊
        let [ format, size ] = await Promise.all([
            new Promise((resolve, reject) => {
                    gm(path).format((err, type) => {
                        if(err) {
                            return reject(err);
                        }
                        return resolve(type);
                    });
                }),
            new Promise((resolve, reject) => {
                    gm(path).size((err, size) => {
                        if(err) {
                            return reject(err);
                        }
                        return resolve(size);
                    });
                })
        ]);

        // 編輯新的名字與 ObjectId
        let objectId = mongoose.Types.ObjectId();
        let now = moment(Date.now()).tz('Asia/Taipei').format('YYYYMMDDHHmm');
        let newName = `${objectId}-${now}.${format.toLowerCase()}`;
        let newPath = `uploads/${newName}`;

        // 將圖片名稱換掉
        fs.renameSync(path, newPath);

        // scp 到 img.nownews.com 圖床
        await new Promise((resolve, reject) => {

            let username = config.get('imageServer.username');
            let password = config.get('imageServer.password');
            let host = config.get('imageServer.host');
            let folder = config.get('imageServer.folder');
            let port = config.get('imageServer.port');
            let scpCommand = `${username}:${password}@${host}:${port}:${folder}`;

            imageServer.scp(newPath, scpCommand, (err) => {
                if(err) {
                    return reject(err);
                }

                return resolve('ok');
            });
        });

        // 組成要儲存的資料
        let options = {
            _id: objectId,
            keyword,
            title,
            desc,
            format,
            originalname,
            mimetype,
            type,
            isDeliver: isDeliver === 'true' ? true : false,
            width: size.width,
            height: size.height,
            url: `${config.get('imageServer.url')}/${newName}`,
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