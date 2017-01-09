
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:department:create');

import _ from 'lodash';

import { Department } from '../../../models';

module.exports = async (req, res, next) => {

    let options = _.pick(req.body, ['name', 'CreatedBy', 'UpdatedBy']);
    debug('options = %j', options);

    try {

        let department = await Department.findOne()
            .where('name').equals(req.body.name)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('department = %j', department);

        if(department) {
            throw new Error('14001');
        }

        let newDepartment = await Department.createAsync(options);
        debug('new department = %j', newDepartment);

        return res.json(newDepartment);
    } catch(err) {
        return next(err);
    }
};