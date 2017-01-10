
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:center:create');

import _ from 'lodash';

import { Center } from '../../../models';

module.exports = async (req, res, next) => {

    let options = _.pick(req.body, ['name', 'CreatedBy', 'UpdatedBy']);

    debug('options = %j', options);

    try {

        let center = await Center.findOne()
            .where('name').equals(req.body.name)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('center = %j', center);

        if(center) {
            throw new Error('13001');
        }

        let newCenter = await Center.createAsync(options);
        debug('new center = %j', newCenter);

        return res.json(newCenter);
    } catch(err) {
        return next(err);
    }
};