/*
 * [POST] /videos/upload 是有影片要從本機上傳
 * [POST] /videos/ 是外部影片連結直接使用
 */


import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:video:create');

import { Video } from '../../../models';

module.exports = async(req, res, next) => {

    try{

        let { Tags, title, url, desc, type, isDeliver, CreatedBy } = req.body;

        // 組成要儲存的資料
        let options = {
            title,
            desc,
            videoFrom: 'EXTERNAL',
            isDeliver: isDeliver === 'true' ? true : false,
            url: url,
            CreatedBy,
            UpdatedBy: CreatedBy
        };

        if(Tags) {
            options.Tags = JSON.parse(Tags);
        }
        debug('options = %j', options);

        // 儲存新的影片資料
        let newVideo = await Video.createAsync(options);
        debug('newVideo = %j', newVideo);

        return res.json(newVideo);
    } catch (err) {
        return next(err);
    };
};