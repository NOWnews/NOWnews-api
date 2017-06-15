
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:dailyPlan:remove');

import { DailyPlan } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;

        let cursor = DailyPlan.findById(id)
            .where('isTrashed').equals(false);

        let dailyPlan = await cursor
            .execAsync();

        if(!dailyPlan) {
            throw new Error('25004');
        }

        dailyPlan.set('isTrashed', true);

        let removedDailyPlan = await dailyPlan.saveAsync();

        return res.json({removedDailyPlan});
    }catch(err) {
        return next(err);
    }
};
