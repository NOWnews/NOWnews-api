
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:center:update');

import Promise from 'bluebird';

import { Center } from '../../../models';

module.exports = async (req, res, next) => {
    let { id } = req.params;
    let { name, Departments, UpdatedBy } = req.body;

    try {

        let [ center, checkCenterByName ] = await Promise.all([
                Center.findById(id)
                    .where('isTrashed').equals(false)
                    .execAsync(),
                Center.findOne()
                    .where('_id').ne(id)
                    .where('name').equals(name)
                    .where('isTrashed').equals(false)
                    .execAsync(),
            ]);
        debug('center = %j', center);
        debug('checkCenterByName = %j', checkCenterByName);

        if(!center) {
            throw new Error('13002');
        }

        if(checkCenterByName) {
            throw new Error('13001');
        }

        if(name) {
            center.set('name', name);
        }

        if(Departments && Departments.length !== 0) {
            center.set('Departments', Departments);
        }

        center.set('UpdatedBy', UpdatedBy);

        let updatedCenter = await center.saveAsync();
        debug('updated center = %j', updatedCenter);

        return res.json(updatedCenter);
    } catch(err) {
        return next(err);
    }
};
