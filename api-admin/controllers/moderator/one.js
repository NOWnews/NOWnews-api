
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:moderator:one');

import { Moderator } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let { id } = req.params;

        let moderator = await Moderator.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

        if(!moderator) {
            throw new Error('29001');
        }

        return res.json(moderator);
    } catch (err) {
        return next(err);
    };
};