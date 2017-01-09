
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:center:one');

import { Center } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;

    try {

        let center = await Center.findById(id)
            .where('isTrashed').equals(false)
            .populate('Departments')
            .execAsync();
        debug('center = %j', center);

        if(!center) {
            throw new Error('13002');
        }

        return res.json(center);
    } catch(err) {
        return next(err);
    }
};