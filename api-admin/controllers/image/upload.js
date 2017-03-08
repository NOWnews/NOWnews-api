
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

import { Image } from '../../../models';

module.exports = async(req, res, next) => {

    let { title, desc, keyword, type, isDeliver, Tag, CreatedBy } = req.body;
    let { path, mimetype, originalname } = req.file;

    try{

        // 讀取檔案的前 4100 bytes 存成 buffer
        let buffer = readChunk.sync(path, 0, 4100);

        let { ext } = fileType(buffer);

        // 用 gm 去讀取圖片的長寬
        let { width, height } = await new Promise((resolve, reject) => {
                gm(path).size((err, size) => {
                    if(err) {
                        return reject(err);
                    }
                    return resolve(size);
                });
            });

        // 編輯新的名字與 ObjectId
        let objectId = mongoose.Types.ObjectId();
        let now = moment(Date.now()).tz('Asia/Taipei').format('YYYYMMDDHHmm');
        let newName = `${objectId}-${now}.${ext}`;
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