
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialChannel:remove');

import { SpecialChannel } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let { id } = req.params;
        let { UpdatedBy } = req.body;

        let specialChannel = await SpecialChannel.findById(id)
            .where('isTrashed').equals(false)
            .populate('newsList MainPhoto CreatedBy UpdatedBy Tag')
            .execAsync();
        debug('specialChannel = %j', specialChannel);

        if(!specialChannel) {
            throw new Error('21001');
        }

        specialChannel.set('isTrashed', true);
        specialChannel.set('UpdatedBy', UpdatedBy);

        let removedSpecialChannel = await specialChannel.saveAsync();
        debug('Removed SpecialChannel = %j', removedSpecialChannel);

        return res.json(removedSpecialChannel);
    } catch (err) {
        return next(err);
    };
};