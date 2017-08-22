
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:menu:sort');

import _ from 'lodash';
import Promise from 'bluebird';

import redis from '../../../redis';
import { Menu } from '../../../models';

module.exports = async (req, res, next) => {

    /*
     *
     * 前台傳入格式如下:
     * [{"id":"58a1292375420e4cc163c62d","children":[{"id":"58a1294475420e4cc163c630"}]},{"id":"58a1292e75420e4cc163c62e"},{"id":"58a1557275420e4cc163c631"},{"id":"58a166475fb84b131f06e37c"}]
     */

    try {

        let menus = req.body.menus;

        // 處理完後的資料
        let menuData = [];

        // 處理第一層的資料
        _.forEach(menus, (mainMenu, i) => {
            menuData.push({
                _id: mainMenu.id,
                weight: i,
                level: 0,
                hasChild: mainMenu.children ? true : false,
                ParentId: null
            });

            // 如果第一層有 child，要處理第二層的資料
            if(mainMenu.children) {
                _.forEach(mainMenu.children, (child, k) => {
                    menuData.push({
                        _id: child.id,
                        weight: k,
                        level: 1,
                        hasChild: false,
                        ParentId: mainMenu.id
                    });
                });
            }
        });

        let updateAllMenus = await Promise.map(menuData, (menu) => {
            return Menu.findById(menu._id)
                .then((doc) => {
                    doc.set('weight', menu.weight);
                    doc.set('level', menu.level);
                    doc.set('hasChild', menu.hasChild);
                    doc.set('ParentId', menu.ParentId);

                    return doc.saveAsync();
                });
        });

        // 將前台要用的 Menu 存在 redis
        let webMenu = await Menu.findWebStructionAsync();
        let cacheData = await redis.setValue(`menu`, webMenu);
        debug('cacheData = %j', cacheData);

        return res.json(updateAllMenus);
    }catch (err) {
        return next(err);
    }
};