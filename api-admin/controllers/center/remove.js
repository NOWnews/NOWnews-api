
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:center:remove');

import { Center, Department } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;
    let { UpdatedBy } = req.body;

    try {

        let center = await Center.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('center = %j', center);

        if(!center) {
            throw new Error('13002');
        }

        // 找出所有 departments 並且改成刪除
        let trashedDepartments = await Department.updateAsync(
            {
                _id: { $in: center.Departments },
                isTrashed: false
            }, {
                $set: { isTrashed: true }
            },
            {
                new: true
            }
        );

        debug('trashedDepartments = %j', trashedDepartments);

        center.set('isTrashed', true);

        let removedCenter = await center.saveAsync();
        debug('removed center = %j', removedCenter);

        return res.json(removedCenter);
    } catch(err) {
        return next(err);
    }
};