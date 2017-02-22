
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:menu:create');

import Promise from 'bluebird';
import _ from 'lodash';

import { Menu } from '../../../models';

module.exports = async (req, res, next) => {

    try {

        let options = _.pick(req.body, [
            'name',
            'categoryName',
            'url',
            'isExternal',
            'isAdult',
            'status',
            'CreatedBy'
        ]);
        options.UpdatedBy = options.CreatedBy;
        debug('options = %j', options);

        // 確認名字或是 url 是否有重複
        let [ getMenuByName, getMenuByUrl, getMenuByCategoryName ] = await Promise.all([
            Menu.findOne()
                .where('name').equals(options.name)
                .where('isTrashed').equals(false)
                .execAsync(),
            Menu.findOne()
                .where('url').equals(options.url)
                .where('isTrashed').equals(false)
                .execAsync(),
            Menu.findOne()
                .and([
                    { categoryName: options.categoryName },
                    { categoryName: { $ne: null } }
                ])
                .where('isTrashed').equals(false)
                .execAsync(),
        ]);

        if(getMenuByName) {
            throw new Error('19004');
        }

        if(getMenuByUrl) {
            throw new Error('19005');
        }

        if(getMenuByCategoryName) {
            throw new Error('19007');
        }

        let newMenu = await Menu.createAsync(options);
        debug('new menu = %j', newMenu);

        return res.json(newMenu);
    } catch (err) {
        return next(err);
    }
};
