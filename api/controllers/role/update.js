import Debug from 'debug';

const debug = Debug('NOWnews-api:api:controllers:role:update');

import { Role } from '../../../models';

module.exports = async (req, res, next) => {
    let { id } = req.params;
    let { name, desc, Policies, UpdatedBy } = req.body;

    try {

        let [ role, checkRoleByName ] = await Promise.all([
                Role.findById(id)
                    .where('isTrashed').equals(false)
                    .execAsync(),
                Role.findOne()
                    .where('id').ne(name)
                    .where('name').equals(name)
                    .where('isTrashed').equals(false)
                    .execAsync(),
            ]);

        debug('role = %j', role);
        debug('checkRoleByName = %j', checkRoleByName);

        if (!role) {
            throw new Error('13002');
        }

        if (checkRoleByName) {
            throw new Error('13001');
        }

        role.set('name', name);
        role.set('desc', desc);
        role.set('Policies', Policies);
        role.set('UpdatedBy', UpdatedBy);

        let updatedRole = await role.saveAsync();

        debug('updated role = %j', updatedRole);

        return res.json(updatedRole);

    } catch(err) {
        return next(err);
    }
};
