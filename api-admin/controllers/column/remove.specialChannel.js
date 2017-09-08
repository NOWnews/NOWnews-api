import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:column:remove.specialChannel');

import { ColumnSpecialChannel } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;

        let data = await ColumnSpecialChannel.findById(id)
            .execAsync();

        if(!data) {
            throw new Error('');
        }

        data.set('isTrashed', true);
        let removedData = await data.saveAsync();

        return res.json(removedData);
    } catch (err) {
        return next(err);
    }
};