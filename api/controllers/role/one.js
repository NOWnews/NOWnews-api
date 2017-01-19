import Debug from 'debug';

const debug = Debug('NOWnews-api:api:controllers:role:one');

import { Role } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;

    try {

        let role = await Role.findById(id)
            .where('isTrashed').equals(false)
            .populate('CreatedBy UpdatedBy')
            .execAsync();

        debug('role = %j', role);

        if(!role) {
            throw new Error('12007');
        }

        return res.json(role);

    } catch(err) {
        return next(err);
    }
};
