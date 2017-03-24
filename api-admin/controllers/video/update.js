
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:video:update');

import { Video } from '../../../models';

module.exports = async(req, res, next) => {

    try{
        let { id } = req.params;
        let { title, desc, UpdatedBy } = req.body;

        let video = await Video.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

        if(!video) {
            throw new Error('23001');
        }

        if(title) {
            video.set('title', title);
        }

        if(desc) {
            video.set('desc', desc);
        }

        video.set('UpdatedBy', UpdatedBy);

        let updatedVideo = await video.saveAsync();

        return res.json(updatedVideo);
    } catch (err) {
        return next(err);
    };
};