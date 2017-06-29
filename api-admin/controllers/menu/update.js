import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:menu:update');

import redis from '../../../redis';
import { Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;
        let {
            name, url, categoryName, isExternal, status, UpdatedBy,
            isAdult, template, templateAD
        } = req.body;

        let [ menu, menuByUrl, menuByCategoryName ] = await Promise.all([
            Menu.findById(id)
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

        if(categoryName) {
            menu.set('categoryName', categoryName);
        }

        if(template) {
            menu.set('template', template);
        }

        if(templateAD) {
            menu.set('templateAD', templateAD);
        }

        isExternal = isExternal === true ? true : false;
        isAdult = isAdult === true ? true : false;
        menu.set('isExternal', isExternal);
        menu.set('isAdult', isAdult);
        menu.set('UpdatedBy', UpdatedBy);


        let updatedMenu = await menu.saveAsync();

        // 將前台要用的 Menu 存在 redis
        let webMenu = await Menu.findWebStructionAsync();
        let cacheData = await redis.setValue(`menu`, webMenu);
        debug('cacheData = %j', cacheData);

        return res.json(updatedMenu);
    } catch (err) {
        return next(err);
    }
};
