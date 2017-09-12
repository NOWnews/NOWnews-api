import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:menu:list');

import { Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { level, template } = req.query;

        let cursor = Menu.find()
            .where('isTrashed').equals(false);

        if(level) {
            cursor.where('level').equals(level);
        }

        if(template) {
            cursor.where('template').equals(template);
        }

        let menus = await cursor.execAsync();
        debug('menus = %j', menus);

        return res.json(menus);
    } catch (err) {
        return next(err);
    }
};