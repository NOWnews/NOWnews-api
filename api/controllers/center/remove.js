
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:center:remove');

import { Center } from '../../../models';

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

        center.set('isTrashed', true);

        let removedCenter = await center.saveAsync();
        debug('removed center = %j', removedCenter);

        return res.json(removedCenter);
    } catch(err) {
        return next(err);
    }
};