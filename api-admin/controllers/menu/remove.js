import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:menu:remove');

import { Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;

        let menu = await Menu.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        if(!menu) {
            throw new Error('19006');
        }

        menu.set('isTrashed', true);

        let removedMenu = await menu.saveAsync();

        return res.json(removedMenu);
    } catch (err) {
        return next(err);
    }
};