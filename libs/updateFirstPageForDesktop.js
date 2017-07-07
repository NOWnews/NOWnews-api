import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateFirstPageForDesktop');

import Promise from 'bluebird';
import config from 'config';

import { News, Menu } from '../models';
import updateCategoryFirstPage from './updateCategoryFirstPage';

module.exports = async () => {
    try {
        console.log(`** Start Update Desktop Category News **`);

        const limit = config.get('general.queryOptions.desktop.limit');
        const skip = config.get('general.queryOptions.desktop.skip');
        const page = config.get('general.queryOptions.desktop.page');

        let menus = await Menu.find()
            .where('isTrashed').equals(false)
            .where('status').equals('OPEN')
            .where('isPermanented').equals(true)
            .where('isExternal').equals(false)
            .execAsync();

        let cacheData = await Promise.map(menus, (menu) => {
            return updateCategoryFirstPage(menu.categoryName, limit, skip, page);
        }, { concurrency: 20 });

        console.log(`** Finish Update Desktop Category News **`);
        return Promise.resolve(cacheData);
    } catch (err) {
        return Promise.reject(err);
    }
};
