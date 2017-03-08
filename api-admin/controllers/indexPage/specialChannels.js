import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:indexpage:specialChannels');

import { IndexPage } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { specialChannels, UpdatedBy } = req.body;

        let indexPage = await IndexPage.findIndexPageAsync();
        debug('indexPage = %j', indexPage);

        indexPage.set('specialChannels', specialChannels);
        indexPage.set('UpdatedBy', UpdatedBy);

        let updatedIndexPage = await indexPage.saveAsync();
        debug('update indexPage = %j', updatedIndexPage);

        return res.json(updatedIndexPage);
    } catch (err) {
        return next(err);
    }
};