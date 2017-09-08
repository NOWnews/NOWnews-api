import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:column:update.specialChannel');

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
            .where('Menu').ne(req.body.Menu)
            .execAsync();

        if(column) {
            throw new Error('29002');
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