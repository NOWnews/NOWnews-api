import Debug from 'debug';
import is from 'is_js';

const debug = Debug('NOWnews-api:api-admin:controllers:department:update');

import Promise from 'bluebird';

import { Department } from '../../../models';

module.exports = async (req, res, next) => {
    let { id } = req.params;
    let { name, Centers, UpdatedBy } = req.body;

    try {

        let [ department, checkDepartmentByName ] = await Promise.all([
                Department.findById(id)
                    .where('isTrashed').equals(false)
                    .execAsync(),
                Department.findOne()
                    .where('_id').ne(id)
                    .where('name').equals(name)
                    .where('isTrashed').equals(false)
                    .execAsync(),
            ]);
        debug('department = %j', department);
        debug('checkDepartmentByName = %j', checkDepartmentByName);

        if(!department) {
            throw new Error('13002');
        }

        if(checkDepartmentByName) {
            throw new Error('13001');
        }

        if(name) {
            department.set('name', name);
        }


        if(Centers && is.string(Centers)) {
            department.Centers.push(Centers);
        }

        if(Centers && is.array(Centers)) {
            department.set('Centers', Centers);
        }

        department.set('UpdatedBy', UpdatedBy);

        let updatedDepartment = await department.saveAsync();
        debug('updated department = %j', updatedDepartment);

        return res.json(updatedDepartment);
    } catch(err) {
        return next(err);
    }
};
