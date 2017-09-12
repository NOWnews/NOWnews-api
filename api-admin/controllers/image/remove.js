
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:image:remove');

import { Image } from '../../../models';

module.exports = async(req, res, next) => {
    try{

        let { id } = req.params;
        let { UpdatedBy } = req.body;

        let image = await Image.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('image = %j', image);

        if(!image) {
            throw new Error('15001');
        }

        image.set('isTrashed', true);
        image.set('UpdatedBy', UpdatedBy);

        let removedImage = await image.saveAsync();

        return res.json(removedImage);
    } catch (err) {
        return next(err);
    };
};