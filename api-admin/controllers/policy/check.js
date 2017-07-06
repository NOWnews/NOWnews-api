
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:policy:check');

import _ from 'lodash';

import { Policy, Role } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        let { path, roleId } = req.query;

        let policy = await Policy.findOne()
            .where('method').equals('get')
            .where('type').in('ADMIN_MENU')
            .where('path').equals(path);

        if(!policy) {
            throw new Error('27001');
        }

        let role = await Role.findById(roleId)
            .where('isTrashed').equals(false)
            .where('Policies').equals(policy._id);

        if(!role) {
            throw new Error('27002');
        }

        return res.json(role);

    }catch(err) {
        return next(err);
    }
};
