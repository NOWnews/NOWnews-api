import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:tag:remove');

import { Tag } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;

        let tag = await Tag.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

        if(!tag) {
            throw new Error('18004');
        }

        tag.set('isTrashed', true);

        let removedTag = await tag.saveAsync();
        debug('removed tag = %j', removedTag);

        return res.json(removedTag);
    }catch(err) {
        return next(err);
    }
};