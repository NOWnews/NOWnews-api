import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:role:remove');

import { Role } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;
    let { UpdatedBy } = req.body;

    try {

        let role = await Role.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

        debug('role = %j', role);

        if (!role) {
            throw new Error('12007');
        }

        role.set('isTrashed', true);
        role.set('UpdatedBy', UpdatedBy);

        let removedRole = await role.saveAsync();

        debug('removed role = %j', removedRole);

        return res.json(removedRole);
    } catch(err) {
        return next(err);
    }
};
