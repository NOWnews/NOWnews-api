
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:image:create');

import { Image } from '../../../models';

module.exports = async(req, res, next) => {

    try{

        let { title, desc, type, isDeliver, Tag, url, CreatedBy } = req.body;

        // 組成要儲存的資料
        let options = {
            title,
            desc,
            imageFrom: 'EXTERNAL',
            type,
            isDeliver: isDeliver === true ? true : false,
            Tag,
            url: url,
            CreatedBy,
            UpdatedBy: CreatedBy
        };
        debug('options = %j', options);

        // 儲存新檔案
        let newImage = await Image.createAsync(options);
        debug('newImage = %j', newImage);

        return res.json(newImage);
    } catch (err) {
        return next(err);
    };
};