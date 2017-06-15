
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:dailyPlan:createComment');
import moment from 'moment';
import _ from 'lodash';

import { DailyPlan } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;
    let { content, name, createdBy } = req.body;
    let createdAt = moment().format("YYYY-MM-DD hh:mm");
    try {

         let dailyPlan = await DailyPlan.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

        dailyPlan.comments.push({content, name, createdBy, createdAt});

        let updatedDailyPlan = await dailyPlan.saveAsync();


        debug('updated dailyPlan = %j', dailyPlan);

        return res.json({dailyPlan});
    }catch(err) {
        return next(err);
    }
};
