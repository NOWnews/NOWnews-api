
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:newsLog:compare');

import Promise from 'bluebird';

import { NewsLog } from '../../../models';

module.exports = async (req, res, next) => {

    let { beforeLogId, afterLogId } = req.query;

    try {

        let beforeCursor = NewsLog.findOne()
            .where('isTrashed').equals(false);


        let afterCursor = NewsLog.findOne()
            .where('isTrashed').equals(false);

        if(beforeLogId) {
            beforeCursor.where('_id').equals(beforeLogId)
        }

        if(afterLogId) {
            afterCursor.where('_id').equals(afterLogId)
        }

        let [ before, after ] = await Promise.all([
            beforeCursor.execAsync(),
            afterCursor.execAsync()
        ]);

        return res.json({
            before,
            after
        });
    }catch(err) {
        return next(err);
    }
};