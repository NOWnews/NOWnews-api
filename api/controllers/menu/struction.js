
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:menu:struction');

import Promise from 'bluebird';

import { Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        /*
         * 因為目前只有兩層選單，所以用這種比較簡單的方式去做，萬一有到第三層，應該就要改變寫法
         */

        // 第一層選單
        let mainMenus = await Menu.find()
            .where('isTrashed').equals(false)
            .where('level').equals(0)
            .sort('weight')
            .lean()
            .execAsync();
        debug('main menus = %j', mainMenus);

        // 第二層選單
        let menuData = await Promise.mapSeries(mainMenus, (mainMenu) => {
            return Menu.find()
                .where('ParentId').equals(mainMenu._id)
                .where('level').equals(1)
                .where('isTrashed').equals(false)
                .sort('weight')
                .lean()
                .execAsync()
                .then((docs) => {
                    mainMenu.child = docs;
                    return Promise.resolve(mainMenu);
                });
        });
        debug('menuData = %j', menuData);
 
        return res.json(menuData);
    } catch (err) {
        return next(err);
    }
};