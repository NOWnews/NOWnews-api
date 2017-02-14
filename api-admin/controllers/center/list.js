
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:center:list');

import { Center } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let centers = await Center.find()
            .where('isTrashed').equals(false)
            .populate('Departments')
            .sort('sn')
            .execAsync();
        debug('centers = %j', centers);

        return res.json(centers);
    } catch(err) {
        return next(err);
    }
};