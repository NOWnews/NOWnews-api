
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:dailyPlan:list');
import moment from 'moment';
import Promise from 'bluebird';
import { DailyPlan } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {

    try {

        let { sort, limit, page, skip, startedAt} = req.query;
        debug('req.query = %j', req.query);

        sort = sort ? sort : '-createdAt';

        let cursor = DailyPlan.find();
        let totalCursor = DailyPlan.find();

        // one specific day
        if(startedAt){
            cursor.where('startedAt').gte(moment(`${startedAt} 00:00`).tz('Asia/Taipei'));
            totalCursor.where('startedAt').gte(moment(`${startedAt} 00:00`).tz('Asia/Taipei'));
            cursor.where('startedAt').lte(moment(`${startedAt} 23:59`).tz('Asia/Taipei'));
            totalCursor.where('startedAt').lte(moment(`${startedAt} 23:59`).tz('Asia/Taipei'));
        }

        let [ dailyPlans, total ] = await Promise.all([
            cursor.find()
                .limit(limit)
                .skip(skip)
                .where('isTrashed').equals(false)
                .deepPopulate('CreatedBy.Avatar messages.User.Avatar')
                .sort(sort)
                .execAsync(),
            totalCursor
                .where('isTrashed').equals(false)
                .countAsync()
        ]);

        debug('post board list = %j', dailyPlans);

        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            dailyPlans,
            pageData
        });
    }catch(err) {
        return next(err);
    }
};
