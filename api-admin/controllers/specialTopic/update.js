
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialTopic:update');

import { SpecialTopic } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let { id } = req.params;
        let { title, url, MainPhoto, UpdatedBy } = req.body;

        let specialTopic = await SpecialTopic.findById(id)
            .where('isTrashed').equals(false)
            .populate('MainPhoto CreatedBy UpdatedBy Tag')
            .execAsync();
        debug('specialTopic = %j', specialTopic);

        if(!specialTopic) {
            throw new Error('20001');
        }

        if(title) {
            specialTopic.set('title', title);
        }

        if(url) {
            specialTopic.set('url', url);
        }

        if(MainPhoto) {
            specialTopic.set('MainPhoto', MainPhoto);
        }

        specialTopic.set('UpdatedBy', UpdatedBy);

        let updatedSpecialTopic = await specialTopic.saveAsync();
        debug('updated specialTopic = %j', updatedSpecialTopic);

        return res.json(updatedSpecialTopic);
    } catch (err) {
        return next(err);
    };
};