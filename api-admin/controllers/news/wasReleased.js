
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:news:wasReleased');

import _ from 'lodash';

import { NewsLog } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        let newsId = req.params.id;

        let releaseLog = await NewsLog.findOne()
            .where('newsId').equals(newsId)
            .where('status').equals('RELEASE')
            .execAsync();

        return res.json({
            wasReleased: releaseLog ? true : false,
        });
    }catch(err) {
        return next(err);
    }
};