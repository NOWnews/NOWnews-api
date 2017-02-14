
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:department:remove');

import { Center, Department } from '../../../models';

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

        // 刪除 center.Departments 的資料
        let center = await Center.findOne()
            .where('Departments').equals(department.id)
            .execAsync();
        debug('center = %j', center);

        if(center) {
            center.Departments.pull(department.id);
            await center.saveAsync();
        }

        department.set('isTrashed', true);

        let removedDepartment = await department.saveAsync();
        debug('removed department = %j', removedDepartment);

        return res.json(removedDepartment);
    } catch(err) {
        return next(err);
    }
};