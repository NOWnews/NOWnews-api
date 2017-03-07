
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialChannel:update');

import { SpecialChannel } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let { id } = req.params;
        let { title, MainPhoto, newsList, UpdatedBy } = req.body;

        let specialChannel = await SpecialChannel.findById(id)
            .where('isTrashed').equals(false)
            .populate('newsList MainPhoto CreatedBy UpdatedBy Tag')
            .execAsync();
        debug('specialChannel = %j', specialChannel);

        if(!specialChannel) {
            throw new Error('21001');
        }

        if(title) {
            specialChannel.set('title', title);
        }

        if(MainPhoto) {
            specialChannel.set('MainPhoto', MainPhoto);
        }

        if(newsList) {
            specialChannel.set('newsList', newsList);
        }

        specialChannel.set('UpdatedBy', UpdatedBy);

        let updatedSpecialChannel = await specialChannel.saveAsync();
        debug('Updated SpecialChannel = %j', updatedSpecialChannel);

        return res.json(updatedSpecialChannel);
    } catch (err) {
        return next(err);
    };
};