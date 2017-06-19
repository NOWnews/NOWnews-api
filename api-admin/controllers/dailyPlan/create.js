import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:dailyPlan:create');
import _ from 'lodash';
import { DailyPlan } from '../../../models';
import moment from 'moment-timezone';

module.exports = async (req, res, next) => {

    let { title, startedAt, Center, content, comments, CreatedBy } = req.body;
    let UpdatedBy = CreatedBy;
    startedAt = moment(startedAt).tz('Asia/Taipei');

    try {

        let dailyPlan = await DailyPlan.createAsync({
            title, startedAt, Center, content, comments, CreatedBy, UpdatedBy
        });

        debug('dailyPlan = %j', dailyPlan);

        return res.json({dailyPlan});
    }catch(err) {
        return next(err);
    }
};
