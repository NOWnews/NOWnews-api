
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:role:create');

import _ from 'lodash';

import { Role } from '../../../models';

module.exports = async (req, res, next) => {

    let { name, desc, policies, CreatedBy, UpdatedBy } = req.body;

    policies = JSON.parse(policies);

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
                Policies: policies,
                CreatedBy,
                UpdatedBy
            });
        debug('new role = %j', newRole);

        return res.json(newRole);
    } catch (err) {
        return next(err);
    }
};