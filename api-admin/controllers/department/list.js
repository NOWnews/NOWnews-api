
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:department:list');

import { Department } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let departments = await Department.find()
            .where('isTrashed').equals(false)
            .populate('Centers')
            .sort('sn')
            .execAsync();
        debug('departments = %j', departments);

        return res.json(departments);
    } catch(err) {
        return next(err);
    }
};
