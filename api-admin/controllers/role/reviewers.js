import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:user:reviewrs');

import { Role, User } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;

    try{

        const role = await Role.findById(id)
            .where('isTrashed').equals(false)
            .select('SuperiorRoles')
            .execAsync();

        if (!role) {
            throw new Error('12007');
        }   

        const users = await User.find()
            .where('isTrashed').equals(false)
            .where('Role').in(role.SuperiorRoles)
            .where('status').equals('REGULAR')
            .select('_id name')
            .execAsync();

        return res.json(users);

    } catch (err) {
        return next(err);
    };
};
