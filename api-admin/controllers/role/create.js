
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:role:create');

import _ from 'lodash';

import { Role } from '../../../models';

module.exports = async (req, res, next) => {

    let { name, desc, Policies, CreatedBy, UpdatedBy } = req.body;

    try {

        let role = await Role.findOne()
            .where('name').equals(name)
            .execAsync();
        debug('role = %j', role);

        if(role) {
            throw new Error('12003');
        }

        let newRole = await Role.createAsync({
                name,
                desc,
                Policies,
                CreatedBy,
                UpdatedBy: CreatedBy
            });
        debug('new role = %j', newRole);

        return res.json(newRole);
    } catch (err) {
        return next(err);
    }
};