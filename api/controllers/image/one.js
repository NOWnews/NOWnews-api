
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:image:one');

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

        return res.json(image);
        // return res.redirect(image.url);
        // return res.redirect('http://s6.gigacircle.com/media/s6_53ba0d35d8829.jpg');
    } catch (err) {
        return next(err);
    };
};