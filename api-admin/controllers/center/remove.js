
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:center:remove');

import { Department, Center } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;
    let { UpdatedBy } = req.body;

    try {

        let center = await Center.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('center = %j', center);

        if(!center) {
            throw new Error('14002');
        }

        // 刪除 department.Centers 的資料
        let department = await Department.findOne()
            .where('Centers').equals(center._id)
            .execAsync();

        debug('department = %j', department);

        if(department) {
            department.Centers.pull(center._id);
            await department.saveAsync();
        }

        center.set('isTrashed', true);

        let removedCenter = await center.saveAsync();
        debug('removed center = %j', removedCenter);

        return res.json(removedCenter);
    } catch(err) {
        return next(err);
    }
};
