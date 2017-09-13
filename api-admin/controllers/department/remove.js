
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:department:remove');

import { Department, Center } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;
    let { UpdatedBy } = req.body;

    try {

        let department = await Department.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('department = %j', department);

        if(!department) {
            throw new Error('13002');
        }

        // 找出所有 centers 並且改成刪除
        let trashedCenters = await Center.updateAsync(
            {
                _id: { $in: department.Centers },
                isTrashed: false
            }, {
                $set: { isTrashed: true }
            },
            {
                multi: true,
                new: true
            }
        );

        debug('trashedCenters = %j', trashedCenters);

        department.set('isTrashed', true);
        department.set('UpdatedBy', UpdatedBy);

        let removedDepartment = await department.saveAsync();
        debug('removed department = %j', removedDepartment);

        return res.json(removedDepartment);
    } catch(err) {
        return next(err);
    }
};
