import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:dailyPlan:list');
import { ReleaseRule } from '../../../models';
import { _ } from 'lodash';

module.exports = async (req, res, next) => {
    try {
        let releaseRules = await ReleaseRule.find({});
        releaseRules = _.keyBy(releaseRules, 'name');


        return res.json(releaseRules);
    }catch(err) {
        return next(err);
    }
};
