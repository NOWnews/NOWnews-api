import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:column:create.specialChannel');

import ColumnSpecialChannel from '../../../models';

module.exports = async (req, res, next) => {
    try {
        let { menuId, subMenus, CreatedBy } = req.body;
    } catch (err) {
        return next(err);
    }
};
