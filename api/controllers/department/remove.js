
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:department:remove');

import { Department } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;
    let { UpdatedBy } = req.body;

    try {

        let department = await Department.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('department = %j', department);

        if(!department) {
            throw new Error('14002');
        }

        department.set('isTrashed', true);

        let removedDepartment = await department.saveAsync();
        debug('removed department = %j', removedDepartment);

        return res.json(removedDepartment);

    } catch(err) {
        return next(err);
    }
};