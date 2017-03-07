
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialTopic:list');

import { SpecialTopic } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let specialTopics = await SpecialTopic.find()
            .where('isTrashed').equals(false)
            .populate('MainPhoto CreatedBy UpdatedBy Tag')
            .execAsync();
        debug('specialTopic list = %j', specialTopics);

        return res.json(specialTopics);
    } catch (err) {
        return next(err);
    };
};