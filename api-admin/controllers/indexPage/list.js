import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:indexpage:list');

import { IndexPage } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { carousels, UpdatedBy } = req.body;

        let indexPage = await IndexPage.findOne()
            .populate('carousels specialTopics specialChannels videos UpdatedBy')
            .execAsync();

        return res.json(indexPage);
    } catch (err) {
        return next(err);
    }
};