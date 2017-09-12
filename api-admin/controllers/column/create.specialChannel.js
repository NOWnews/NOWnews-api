import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:column:create.specialChannel');

import _ from 'lodash';
import Promise from 'bluebird';

import { ColumnSpecialChannel, Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        // 將所有的 id 做成一個 array
        let checkMenuIds = _.concat([req.body.Menu], req.body.SubMenus);

        let menus = await Menu.find()
            .where('isTrashed').equals(false)
            .where('_id').in(checkMenuIds)
            .where('template').equals('SPECIALCHANNEL')
            .execAsync();
        debug('menus = %j', menus);

        if(menus.length !== checkMenuIds.length) {
            throw new Error('29001');
        }

        // 確認這個 Menu 是不是存在了
        let column = await ColumnSpecialChannel.findOne()
            .where('isTrashed').equals(false)
            .where('Menu').equals(req.body.Menu)
            .execAsync();

        if(column) {
            throw new Error('29002');
        }

        let newData = await ColumnSpecialChannel.createAsync({
            Menu: req.body.Menu,
            SubMenus: req.body.SubMenus,
            CreatedBy: req.body.CreatedBy,
            UpdatedBy: req.body.CreatedBy
        });

        return res.json(newData);
    } catch (err) {
        return next(err);
    }
};
