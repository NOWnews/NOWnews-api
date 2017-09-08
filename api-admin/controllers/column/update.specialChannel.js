import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:column:update.specialChannel');

import _ from 'lodash';
import Promise from 'bluebird';

import { ColumnSpecialChannel, Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        // 將所有的 id 做成一個 array
        let checkMenuIds = _.concat([req.body.Menu], req.body.SubMenus);

        // 找出所有 menu
        let menus = await Promise.map(checkMenuIds, (menuId) => {
            return Menu.findById(menuId)
                .where('isTrashed').equals(false)
                .execAsync();
        });
        debug('menus = %j', menus);

        // 確認所有的 menu 是不是都是 template === 'SPECIALCHANNEL'
        _.forEach(menus, (menu) => {
            if(menu !== null) {
                return;
            }

            throw new Error('');
        });

        // 確認這個 Menu 是不是存在了
        let column = await ColumnSpecialChannel.findOne()
            .where('isTrashed').equals(false)
            .where('Menu').equals(req.body.Menu)
            .where('Menu').ne(req.body.Menu)
            .execAsync();
        console.log(column);

        if(column) {
            throw new Error('');
        }

        let updatedData = await ColumnSpecialChannel.findOneAndUpdateAsync({
                _id: req.params.id
            }, {
                $set: {
                    Menu: req.body.Menu,
                    SubMenus: req.body.SubMenus,
                    UpdatedBy: req.body.UpdatedBy
                }
            }, {
                new: true
            });

        return res.json(updatedData);
    } catch (err) {
        return next(err);
    }
};