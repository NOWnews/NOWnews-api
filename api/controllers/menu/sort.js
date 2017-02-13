
/* 

Wayne 產出的原始資料:
[ { item_id: null, parent_id: null, depth: 0, left: 1, right: 14 },
  { id: '2', parent_id: null, depth: 0, left: 2, right: 9 },
  { id: '4', parent_id: '2', depth: 1, left: 3, right: 6 },
  { id: '6', parent_id: '4', depth: 2, left: 4, right: 5 },
  { id: '5', parent_id: '2', depth: 1, left: 7, right: 8 },
  { id: '7', parent_id: null, depth: 0, left: 10, right: 11 },
  { id: '3', parent_id: null, depth: 0, left: 12, right: 13 } ]

Simon 產出的類似格式:

[
        {"id": "589c8eb75cc7952eede6e74b", "parent_id": "589c92f548766f4425ec0f60", "depth": 2},
        {"id": "589c8ecc5cc7952eede6e74c", "parent_id": "589c92f548766f4425ec0f60", "depth": 3}
    ]
*/

import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:menu:sort');

import Promise from 'bluebird';

import { Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        // 因為前端套件問題，要先去除掉第一個 item
        let menus = req.body.menus.splice(1, req.body.menus.length);

        let updateAllMenus = await Promise.map(menus, (menu) => {
            return Menu.findById(menu.id)
                .then((doc) => {

                    doc.set('ParentId', menu.parent_id);
                    doc.set('level', menu.depth);

                    return doc.saveAsync();
                });
        });

        // 更新 parentId 的資料欄位
        let updateParents = await Promise.map(menus, (menu) => {
            if(!menu.parent_id) {
                return Promise.resolve(null);
            }

            return Menu.findById(menu.parent_id)
                .then((doc) => {
                    doc.set('hasChild', true);
                    return doc.saveAsync();
                });
        });

        return res.json(updateAllMenus);
    } catch (err) {
        return next(err);
    }
};