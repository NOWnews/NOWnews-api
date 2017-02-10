
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:menu:list');

import Promise from 'bluebird';
import _ from 'lodash';
import is from 'is_js';

import { Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        let menus = await Menu.find()
            .where('isTrashed').equals(false)
            .execAsync();
        debug('menus = %j', menus);

        let menuData = [];

        let [ firstLevel, secondLevel, thirdLevel ] = await Promise.all([
            Menu.find()
                .where('level').equals(1)
                .sort('-weight')
                .where('isTrashed').equals(false)
                .execAsync(),
            Menu.find()
                .where('level').equals(2)
                .sort('-weight')
                .where('isTrashed').equals(false)
                .lean()
                .execAsync(),
            Menu.find()
                .where('level').equals(3)
                .sort('-weight')
                .where('isTrashed').equals(false)
                .execAsync()
        ]);
        debug('First Level = %j', firstLevel);
        debug('Second Level = %j', secondLevel);
        debug('Third Level = %j', thirdLevel);

        // 排第二層
        let secondLevelByParant = {};
        console.log(is.array(secondLevel));
        _.forEach(firstLevel, (foo) => {
            console.log(foo);
        });
        // _.forEach(secondLevel, (foo) => {
        //     debug('foo = %j', foo);
        //     // console.log(foo);
        // });
        // secondLevel.forEach((foo) => {
        //     console.log(foo);
        // });
        // if(secondLevel && secondLevel.length !== 0) {
        //     _.forEach(secondLevel, function(foo) {
        //         console.log(foo);
        //     });
        //     // _.forEach(secondLevel, (foo, bar) => {
        //     //     console.log(foo);
        //     //     // let parentId = foo.ParentId + '';
        //     //     // console.log(parentId);
        //     //     // if(!secondLevelByParant[parentId]) {
        //     //     //     secondLevelByParant[parentId] = [];
        //     //     // }

        //     //     // secondLevelByParant[parentId].push(menu);
        //     // });
        // }
        console.log(secondLevelByParant);

        return res.json(menus);
    } catch (err) {
        return next(err);
    }
};