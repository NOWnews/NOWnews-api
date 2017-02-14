
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:role:list');

import { Role } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let roles = await Role.find()
            .where('isTrashed').equals(false)
            .sort('sn')
            .execAsync();
        debug('roles = %j', roles);

        return res.json(roles);
    } catch(err) {
        return next(err);
    }
};
