import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:dailyPlan:list');
import {
    ReleaseRule
} from '../../../models';
import {
    _
} from 'lodash';

module.exports = async(req, res, next) => {
    try {
        let { centerId, startHour, startMinute, endHour, endMinute, roleIds } = req.body;

        if (!_.isArray(roleIds)) {
            roleIds = [roleIds];
        }
        if(!roleIds){
            roleIds = [];
        }
        let timeAndRoleRule = await ReleaseRule.findOneAndUpdateAsync({
            name: "timeAndRole"
        }, {
            $push: {
                "mixed": {
                    centerId,
                    startHour,
                    startMinute,
                    endHour,
                    endMinute,
                    roleIds
                }
            }
        }, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        });

        return res.json(timeAndRoleRule);
    } catch (err) {
        return next(err);
    }
};