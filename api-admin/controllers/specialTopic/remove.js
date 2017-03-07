
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialTopic:remove');

import { SpecialTopic } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let { id } = req.params;
        let { UpdatedBy } = req.body;

        let specialTopic = await SpecialTopic.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('specialTopic = %j', specialTopic);

        if(!specialTopic) {
            throw new Error('20001');
        }

        specialTopic.set('isTrashed', true);
        specialTopic.set('UpdatedBy', UpdatedBy);

        let removedSpecialTopic = await specialTopic.saveAsync();
        debug('removed specialTopic = %j', removedSpecialTopic);

        return res.json(removedSpecialTopic);
    } catch (err) {
        return next(err);
    };
};