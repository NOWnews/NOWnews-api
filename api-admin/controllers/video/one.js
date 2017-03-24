
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:video:one');

import { Video } from '../../../models';

module.exports = async(req, res, next) => {

    try{
        let { id } = req.params;

        let video = await Video.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

        if(!video) {
            throw new Error('23001');
        }

        return res.json(video);
    } catch (err) {
        return next(err);
    };
};