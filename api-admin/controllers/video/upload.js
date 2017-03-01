/*
 * [POST] /videos/upload 是有影片要從本機上傳
 * [POST] /videos/ 是外部影片連結直接使用
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:video:upload');

import readChunk from 'read-chunk';
import fileType from 'file-type';
import fs from 'fs';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
import config from 'config';
import server from 'scp2';

import { Video } from '../../../models';

module.exports = async(req, res, next) => {
    try{

        let { Tags, title, desc, type, isDeliver, CreatedBy } = req.body;
        let { size, path, mimetype, originalname } = req.file;

        // 讀取檔案的前 4100 bytes 存成 buffer
        let buffer = readChunk.sync(path, 0, 4100);

        let objectId = mongoose.Types.ObjectId();
        let now = moment(Date.now()).tz('Asia/Taipei').format('YYYYMMDDHHmm');
        let { ext } = fileType(buffer);
        let newName = `${objectId}-${now}.${ext}`;
        let newPath = `uploads/${newName}`;

        // 將影片名稱換掉
        fs.renameSync(path, newPath);

        // scp 到 img.nownews.com 圖床
        await new Promise((resolve, reject) => {

            let username = config.get('videoServer.username');
            let password = config.get('videoServer.password');
            let host = config.get('videoServer.host');
            let folder = config.get('videoServer.folder');
            let port = config.get('videoServer.port');
            let scpCommand = `${username}:${password}@${host}:${port}:${folder}`;

            server.scp(newPath, scpCommand, (err) => {
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
            videoFrom: 'INTERNAL',
            originalname,
            format: ext,
            type,
            mimetype,
            // isDeliver: isDeliver === 'true' ? true : false,
            Tags: JSON.parse(Tags),
            url: `${config.get('videoServer.url')}/${newName}`,
            size,
            CreatedBy,
            UpdatedBy: CreatedBy
        };
        debug('options = %j', options);

        // 儲存新的影片資料
        let newVideo = await Video.createAsync(options);
        debug('newVideo = %j', newVideo);

        // 刪掉檔案
        await new Promise((resolve, reject) => {
            fs.unlink(newPath, (err, result) => {
                if(err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });

        return res.json(newVideo);
    } catch (err) {
        return next(err);
    };
};