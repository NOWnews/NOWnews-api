
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:video:remove');

import { Video } from '../../../models';

module.exports = async(req, res, next) => {

    try{
        let { id } = req.params;
        let { UpdatedBy } = req.body;

        let video = await Video.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

        if(!video) {
            throw new Error('23001');
        }

        video.set('isTrashed', true);
        video.set('UpdatedBy', UpdatedBy);

        let removedVideo = await video.saveAsync();

        return res.json(removedVideo);
    } catch (err) {
        return next(err);
    };
};