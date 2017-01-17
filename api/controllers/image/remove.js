
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:image:remove');

import { Image } from '../../../models';

module.exports = async(req, res, next) => {

    let { id } = req.params;

    try{

        let image = await Image.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('image = %j', image);

        if(!image) {
            throw new Error('15001');
        }

        image.set('isTrashed', true);

        let removedImage = await image.saveAsync();

        return res.json(removedImage);
    } catch (err) {
        return next(err);
    };
};