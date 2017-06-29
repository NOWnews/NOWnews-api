
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:menu:create');

import Promise from 'bluebird';
import _ from 'lodash';

import redis from '../../../redis';
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
            'template',
            'templateAD',
            'CreatedBy'
        ]);
        options.UpdatedBy = options.CreatedBy;
        debug('options = %j', options);

        // 確認 url 是否有重複
        let [ getMenuByUrl, getMenuByCategoryName ] = await Promise.all([
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

        if(getMenuByUrl) {
            throw new Error('19005');
        }

        if(getMenuByCategoryName) {
            throw new Error('19007');
        }

        let newMenu = await Menu.createAsync(options);
        debug('new menu = %j', newMenu);

        // 將前台要用的 Menu 存在 redis
        let webMenu = await Menu.findWebStructionAsync();
        let cacheData = await redis.setValue(`menu`, webMenu);
        debug('cacheData = %j', cacheData);

        return res.json(newMenu);
    } catch (err) {
        return next(err);
    }
};
