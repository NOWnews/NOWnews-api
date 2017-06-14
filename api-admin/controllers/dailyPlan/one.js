
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:dailyPlan:one');

import { DailyPlan } from '../../../models';

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;

        let cursor = DailyPlan.findById(id)
            .where('isTrashed').equals(false);

        let dailyPlan = await cursor
            .deepPopulate('CreatedBy.Avatar messages.User.Avatar')
            .execAsync();

        if(!dailyPlan) {
            throw new Error('25004');
        }

        debug('this dailyPlan = %j', dailyPlan);

        return res.json({
            dailyPlan
        });
    }catch(err) {
        return next(err);
    }
};
