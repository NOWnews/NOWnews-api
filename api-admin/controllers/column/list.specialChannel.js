import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:column:list.specialChannel');

import { ColumnSpecialChannel } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let list = await ColumnSpecialChannel.find()
            .where('isTrashed').equals(false)
            .populate([
                {
                    path: 'Menu',
                    select: 'name url template'
                },
                {
                    path: 'SubMenus',
                    select: 'name url template'
                }
            ])
            .sort('-createdAt')
            .execAsync();

        return res.json(list);
    } catch (err) {
        return next(err);
    }
};