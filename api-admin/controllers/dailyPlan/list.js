import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:dailyPlan:list');
import moment from 'moment';
import Promise from 'bluebird';
import { DailyPlan } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {
    try {

        let { sort, limit, page, skip, startedAt, Center} = req.query;
        debug('req.query = %j', req.query);

        sort = sort ? sort : '-createdAt';

        let cursor = DailyPlan.find();
        let totalCursor = DailyPlan.find();

        // one day
        if(startedAt){
            cursor.where('startedAt').gte(moment.tz(startedAt,'YYYY-MM-DD','Asia/Taipei').startOf('day'));
            totalCursor.where('startedAt').gte(moment.tz(startedAt,'YYYY-MM-DD','Asia/Taipei').startOf('day'));
            cursor.where('startedAt').lte(moment.tz(startedAt,'YYYY-MM-DD','Asia/Taipei').endOf('day'));
            totalCursor.where('startedAt').lte(moment.tz(startedAt,'YYYY-MM-DD','Asia/Taipei').endOf('day'));
        }

        if(Center){
            cursor.where('Center').equals(Center);
            totalCursor.where('Center').equals(Center);
        }

        let [ dailyPlans, total ] = await Promise.all([
            cursor.find()
                .limit(limit)
                .skip(skip)
                .where('isTrashed').equals(false)
                .deepPopulate('CreatedBy.Avatar messages.User.Avatar Center')
                .sort(sort)
                .execAsync(),
            totalCursor
                .where('isTrashed').equals(false)
                .countAsync()
        ]);

        debug('dailyPlan list = %j', dailyPlans);

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
