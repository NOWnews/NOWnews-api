import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:indexpage:addCarousels');

import redis from '../../../redis';
import libs from '../../../libs';
import { IndexPage } from '../../../models';
import _ from 'lodash';

module.exports = async (req, res, next) => {
    try {

        let { addCarousels, UpdatedAddBy } = req.body;

        // 陣列裡面不能有空值
        addCarousels = _.map(addCarousels, (carousel) => {
            if(!carousel) {
                return null;
            }
            return carousel;
        });

        let indexPage = await IndexPage.findIndexPageAsync();
        debug('indexPage = %j', indexPage);

        indexPage.set('addCarousels', addCarousels);
        indexPage.set('UpdatedAddBy', UpdatedAddBy);

        let updatedIndexPage = await indexPage.saveAsync();
        debug('update indexPage = %j', updatedIndexPage);

        // 將 redis 清除
        redis.removeValue(`indexPage`);

        return res.json(updatedIndexPage);
    } catch (err) {
        return next(err);
    }
};