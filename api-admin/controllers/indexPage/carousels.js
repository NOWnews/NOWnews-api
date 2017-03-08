import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:indexpage:carousels');

import { IndexPage } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { carousels, UpdatedBy } = req.body;

        let indexPage = await IndexPage.findIndexPageAsync();
        debug('indexPage = %j', indexPage);

        indexPage.set('carousels', carousels);
        indexPage.set('UpdatedBy', UpdatedBy);

        let updatedIndexPage = await indexPage.saveAsync();
        debug('update indexPage = %j', updatedIndexPage);

        return res.json(updatedIndexPage);
    } catch (err) {
        return next(err);
    }
};