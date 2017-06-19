
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:dailyPlan:list');

import { DailyPlan } from '../../../models';
import moment from 'moment-timezone';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;
        let { title, startedAt, Center, content, UpdatedBy } = req.body;
        startedAt = moment(startedAt).tz('Asia/Taipei');

        debug('req.body %j', req.body);

        let dailyPlan = await DailyPlan.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

        if(!dailyPlan) {
            throw new Error('25004');
        }

        let updateTitle = dailyPlan.title;
        let updateStartedAt = dailyPlan.startedAt;
        let updateCenter = dailyPlan.Center;
        let updateContent = dailyPlan.content;
        let updateComments = dailyPlan.comments;

        if(title && title !== ''){
            updateTitle = title;
        }
        if(startedAt && startedAt !== ''){
            updateStartedAt = startedAt;
        }
        if(Center && Center !== ''){
            updateCenter = Center;
        }
        updateContent = content;

        dailyPlan.set('title', updateTitle);
        dailyPlan.set('startedAt', updateStartedAt);
        dailyPlan.set('Center', updateCenter);
        dailyPlan.set('content', updateContent);
        dailyPlan.set('UpdatedBy', UpdatedBy);

        let updatedDailyPlan = await dailyPlan.saveAsync();

        return res.json({updatedDailyPlan});
    }catch(err) {
        return next(err);
    }
};
