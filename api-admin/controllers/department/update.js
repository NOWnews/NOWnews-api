
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:department:update');

import Promise from 'bluebird';

import { Department } from '../../../models';

module.exports = async (req, res, next) => {

    let { name, UpdatedBy } = req.body;
    let { id } = req.params;

    try {

        let [ department, checkDepartmentByName ] = await Promise.all([
                Department.findById(id)
                    .where('isTrashed').equals(false)
                    .execAsync(),
                Department.findOne()
                    .where('_id').ne(id)
                    .where('name').equals(name)
                    .where('isTrashed').equals(false)
                    .execAsync()
            ]);
        debug('department = %j', department);
        debug('checkDepartmentByName = %j', checkDepartmentByName);

        if(!department) {
            throw new Error('14002');
        }

        if(checkDepartmentByName) {
            throw new Error('14001');
        }

        if(name) {
            department.set('name', name);
        }

        department.set('UpdatedBy', UpdatedBy);

        let updatedDepartment = await department.saveAsync();
        debug('updated department = %j', updatedDepartment);

        return res.json(updatedDepartment);
    } catch(err) {
        return next(err);
    }
};
