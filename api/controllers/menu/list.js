import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:menu:list');

import { Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        let menus = await Menu.find()
            .where('isTrashed').equals(false)
            .execAsync();
        debug('menus = %j', menus);

        return res.json(menus);
    } catch (err) {
        return next(err);
    }
};