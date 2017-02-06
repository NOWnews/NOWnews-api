
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:tag:one');

import { Tag } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let { id } = req.params;

        let tag = await Tag.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

        if(!tag) {
            throw new Error('18004');
        }

        return res.json(tag);
    } catch (err) {
        return next(err);
    };
};