
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:image:clone');

import { Image } from '../../../models';

module.exports = async(req, res, next) => {

    try{

        let { id, desc, CreatedBy } = req.body;

        let image = await Image.findById(id)
            .execAsync();
        debug('original image = %j', image);

        if(!image) {
            throw new Error('15001');
        }

        let options = {
            title: image.title,
            desc,
            keyword: image.keyword,
            imageFrom: image.imageFrom,
            originalname: image.originalname,
            format: image.format,
            type: image.type,
            mode: image.mode,
            mimetype: image.mimetype,
            width: image.width,
            height: image.height,
            isDeliver: image.isDeliver,
            Tag: image.Tag,
            url: image.url,
            isTrashed: image.isTrashed,
            CreatedBy: CreatedBy,
            UpdatedBy: CreatedBy
        };

        let clonedImage = await Image.createAsync(options);
        debug('clone image = %j', clonedImage);

        return res.json(clonedImage);
    } catch (err) {
        return next(err);
    };
};