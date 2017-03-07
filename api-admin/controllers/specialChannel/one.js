
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialChannel:one');

import { SpecialChannel } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let { id } = req.params;

        let specialChannel = await SpecialChannel.findById(id)
            .where('isTrashed').equals(false)
            .populate('newsList MainPhoto CreatedBy UpdatedBy Tag')
            .execAsync();
        debug('specialChannel = %j', specialChannel);

        if(!specialChannel) {
            throw new Error('21001');
        }

        return res.json(specialChannel);
    } catch (err) {
        return next(err);
    };
};