import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:menu:update');

import { Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;
        let { name, url, categoryName, isExternal, status, UpdatedBy, isAdult } = req.body;

        let [ menu, menuByName, menuByUrl, menuByCategoryName ] = await Promise.all([
            Menu.findById(id)
                .where('isTrashed').equals(false)
                .execAsync(),
            Menu.findOne()
                .where('_id').ne(id)
                .where('name').equals(name)
                .where('isTrashed').equals(false)
                .execAsync(),
            Menu.findOne()
                .where('_id').ne(id)
                .where('url').equals(url)
                .where('isTrashed').equals(false)
                .execAsync(),
            Menu.findOne()
                .where('_id').ne(id)
                .and([
                    { categoryName: categoryName },
                    { categoryName: { $ne: null } }
                ])
                .where('isTrashed').equals(false)
                .execAsync(),
        ]);

        if(!menu) {
            throw new Error('19006');
        }

        if(menuByName) {
            throw new Error('19004');
        }

        if(menuByUrl) {
            throw new Error('19005');
        }

        if(menuByCategoryName) {
            throw new Error('19007');
        }

        if(name) {
            menu.set('name', name);
        }

        if(url) {
            menu.set('url', url);
        }

        if(status) {
            menu.set('status', status);
        }

        isExternal = isExternal === true ? true : false;
        isAdult = isAdult === true ? true : false;
        menu.set('isExternal', isExternal);
        menu.set('isAdult', isAdult);
        menu.set('UpdatedBy', UpdatedBy);

        let updatedMenu = await menu.saveAsync();

        return res.json(updatedMenu);
    } catch (err) {
        return next(err);
    }
};
