
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:image:update');

import { Image } from '../../../models';

module.exports = async(req, res, next) => {

    try{

        let { desc, UpdatedBy } = req.body;
        let { id } = req.params;

        // 更新圖片只允許外部圖片，內部圖片都應該是 clone 一份新的
        let image = await Image.findById(id)
            .where('isTrashed').equals(false)
            .where('imageFrom').ne('INTERNAL')
            .execAsync();
        debug('image = %j', image);

        if(!image) {
            throw new Error('15001');
        }

        image.set('desc', desc);
        image.set('UpdatedBy', UpdatedBy);

        let updatedImage = await image.saveAsync();

        debug('updated image = %j', updatedImage);

        return res.json(updatedImage);
    } catch (err) {
        return next(err);
    };
};