import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:dailyPlan:list');
import { ReleaseRule } from '../../../models';
import { _ } from 'lodash';

module.exports = async (req, res, next) => {
    try {
        let { centerId, startHour, startMinute, endHour, endMinute, roleIds } = req.body;
        // let timeAndRoleRule = await ReleaseRule.findOne({
        //     name: "timeAndRole"
        // });
        // if(timeAndRoleRule){
        //     console.log('mix...',timeAndRoleRule.mixed);
        // }
        if(!_.isArray(roleIds)){
            roleIds = [ roleIds ];
        }
        let timeAndRoleRule = await ReleaseRule.findOneAndUpdateAsync({
                name: "timeAndRole"
            }, { $push : { "mixed" : { centerId, startHour, startMinute, endHour, endMinute, roleIds } } }, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
        });
            return res.send();
        // return res.json(releaseRules);
    }catch(err) {
        return next(err);
    }
};
