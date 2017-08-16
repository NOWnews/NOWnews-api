import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:indexpage:list');

import { IndexPage } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let indexPage = await IndexPage.findOne()
            .populate([
                { path:'videos', select: 'title sn'},
                { path:'carousels', select: 'title sn'},
                { path:'specialTopics', select: 'title url'},
                { path:'specialChannels', select: 'title sn'}
            ])
            .execAsync();

        return res.json(indexPage);
    } catch (err) {
        return next(err);
    }
};