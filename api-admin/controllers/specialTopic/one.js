
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialTopic:one');

import { SpecialTopic } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let { id } = req.params;

        let specialTopic = await SpecialTopic.findById(id)
            .where('isTrashed').equals(false)
            .populate('MainPhoto CreatedBy UpdatedBy Tag')
            .execAsync();
        debug('specialTopic = %j', specialTopic);

        if(!specialTopic) {
            throw new Error('20001');
        }

        return res.json(specialTopic);
    } catch (err) {
        return next(err);
    };
};