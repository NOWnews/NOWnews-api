
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:image:upload');

import gm from 'gm';
import fs from 'fs';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import moment from 'moment-timezone';

import { Image } from '../../../models';

module.exports = async(req, res, next) => {

    let { keyword, title, desc, CreatedBy } = req.body;
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

        // 組成要儲存的資料
        let options = {
            _id: objectId,
            keyword,
            title,
            desc,
            format,
            originalname,
            mimetype,
            width: size.width,
            height: size.height,
            url: `https://whocare.com/${newName}`,
            CreatedBy,
            UpdatedBy: CreatedBy
        };
        debug('options = %j', options);

        // 儲存新檔案
        let newImage = await Image.createAsync(options);
        debug('newImage = %j', newImage);

        // 刪掉檔案
        await new Promise((resolve, reject) => {
            fs.unlink(path, (err, result) => {
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