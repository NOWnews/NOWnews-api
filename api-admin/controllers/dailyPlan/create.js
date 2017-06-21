import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:dailyPlan:create');
import _ from 'lodash';
import { DailyPlan } from '../../../models';

module.exports = async (req, res, next) => {

    let { title, startedAt, Center, content, comments, CreatedBy } = req.body;
    let UpdatedBy = CreatedBy;

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
