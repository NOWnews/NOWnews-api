
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:newsLog:list');

import { NewsLog } from '../../../models';

module.exports = async (req, res, next) => {

    let { newsId, sort } = req.query;

    try {

        sort = sort ? sort : '-createdAt';

        let causor = NewsLog.find()
            .where('isTrashed').equals(false)
            .sort(sort);

        if(newsId) {
            causor.where('newsId').equals(newsId);
        }

        let logs = await causor.execAsync();

        return res.json(logs);
    }catch(err) {
        return next(err);
    }
};