
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:menu:struction');

import Promise from 'bluebird';

import { Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let menuData = await Menu.findAdminStructionAsync();
        debug('menuData = %j', menuData);

        return res.json(menuData);
    } catch (err) {
        return next(err);
    }
};