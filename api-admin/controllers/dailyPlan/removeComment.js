
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:dailyPlan:removeComment');

import _ from 'lodash';
import { DailyPlan } from '../../../models';

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;
        let { commentIndex } = req.body;

        let cursor = DailyPlan.findById(id)
            .where('isTrashed').equals(false);

        let dailyPlan = await cursor
            .execAsync();

        if(!dailyPlan) {
            throw new Error('25004');
        }

        let comments = dailyPlan.comments;
        comments.splice(commentIndex,1);

        dailyPlan.set('Comments', comments);

        let removedDailyPlan = await dailyPlan.saveAsync();

        return res.json({removedDailyPlan});
    }catch(err) {
        return next(err);
    }
};
