
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:department:one');

import { Department } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;

    try {

        let department = await Department.findById(id)
            .where('isTrashed').equals(false)
            .populate('Centers CreatedBy UpdatedBy')
            .execAsync();

        debug('department = %j', department);

        if(!department) {
            throw new Error('13002');
        }

        return res.json(department);
    } catch(err) {
        return next(err);
    }
};
