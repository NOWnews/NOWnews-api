
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:image:realRemove');

import { Image } from '../../../models';

module.exports = async(req, res, next) => {
    try{

        let { id } = req.params;

        let image = await Image.findById(id)
            .execAsync();

        if(!image) {
            throw new Error('15001');
        }

        let removedImage = await image.removeAsync();

        return res.json(removedImage);
    } catch (err) {
        return next(err);
    };
};