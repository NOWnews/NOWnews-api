
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:menu:sort');

import _ from 'lodash';
import Promise from 'bluebird';

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

        return res.json(updateAllMenus);
    }catch (err) {
        return next(err);
    }
};

// module.exports = async (req, res, next) => {

// [ { item_id: null, parent_id: null, depth: 0, left: 1, right: 14 },
//   { id: '2', parent_id: null, depth: 0, left: 2, right: 9 },
//   { id: '4', parent_id: '2', depth: 1, left: 3, right: 6 },
//   { id: '6', parent_id: '4', depth: 2, left: 4, right: 5 },
//   { id: '5', parent_id: '2', depth: 1, left: 7, right: 8 },
//   { id: '7', parent_id: null, depth: 0, left: 10, right: 11 },
//   { id: '3', parent_id: null, depth: 0, left: 12, right: 13 } ]

//     try {

//         // 因為前端套件問題，要先去除掉第一個 item
//         let menus = req.body.menus.splice(1, req.body.menus.length);

//         let updateAllMenus = await Promise.map(menus, (menu) => {
//             return Menu.findById(menu.id)
//                 .then((doc) => {

//                     doc.set('ParentId', menu.parent_id);
//                     doc.set('level', menu.depth);

//                     // 以目前來說，第二層不會有 child
//                     let hasChild = menu.depth > 0 ? false : false;
//                     doc.set('hasChild', hasChild);

//                     return doc.saveAsync();
//                 });
//         });

//         // 更新 parentId 的資料欄位
//         let updateParents = await Promise.map(menus, (menu) => {

//             if(!menu.parent_id) {
//                 return Menu.findById(menu.parent_id)
//                     .then((doc) => {
//                         doc.set('hasChild', false);
//                         return doc.saveAsync();
//                     });
//             }

//             return Menu.findById(menu.parent_id)
//                 .then((doc) => {
//                     doc.set('hasChild', true);
//                     return doc.saveAsync();
//                 });
//         });

//         return res.json(updateAllMenus);
//     } catch (err) {
//         return next(err);
//     }
// };