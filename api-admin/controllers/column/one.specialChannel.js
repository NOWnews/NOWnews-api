import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:column:one.specialChannel');

import { ColumnSpecialChannel } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;

        let data = await ColumnSpecialChannel.findById(id)
            .where('isTrashed').equals(false)
            .populate('CreatedBy UpdatedBy')
            .execAsync();

        if(!data) {
            throw new Error('');
        }

        return res.json(data);
    } catch (err) {
        return next(err);
    }
};