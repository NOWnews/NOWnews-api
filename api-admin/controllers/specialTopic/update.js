
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialTopic:update');

import { SpecialTopic } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let { id } = req.params;
        let { title, url, MainPhoto } = req.body;

        let specialTopic = await SpecialTopic.findById(id)
            .where('isTrashed').equals(false)
            .populate('MainPhoto CreatedBy UpdatedBy Tag')
            .execAsync();
        debug('specialTopic = %j', specialTopic);

        if(title) {
            specialTopic.set('title', title);
        }

        if(url) {
            specialTopic.set('url', url);
        }

        if(MainPhoto) {
            specialTopic.set('MainPhoto', MainPhoto);
        }

        let updatedSpecialTopic = await specialTopic.saveAsync();
        debug('updated specialTopic = %j', updatedSpecialTopic);

        return res.json(updatedSpecialTopic);
    } catch (err) {
        return next(err);
    };
};