
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialChannel:list');

import { SpecialChannel } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let specialChannels = await SpecialChannel.find()
            .where('isTrashed').equals(false)
            .populate('newsList MainPhoto CreatedBy UpdatedBy Tag')
            .execAsync();
        debug('specialChannel list = %j', specialChannels);

        return res.json(specialChannels);
    } catch (err) {
        return next(err);
    };
};