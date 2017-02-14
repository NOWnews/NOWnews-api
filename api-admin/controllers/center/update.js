import Debug from 'debug';
import is from 'is_js';

const debug = Debug('NOWnews-api:api-admin:controllers:center:update');

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


        if(Departments && is.string(Departments)) {
            center.Departments.push(Departments);
        }

        if(Departments && is.array(Departments)) {
            center.set('Departments', Departments);
            return;
        }

        center.set('UpdatedBy', UpdatedBy);

        let updatedCenter = await center.saveAsync();
        debug('updated center = %j', updatedCenter);

        return res.json(updatedCenter);
    } catch(err) {
        return next(err);
    }
};
