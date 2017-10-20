// import Debug from 'debug';
// const debug = Debug('NOWnews-api:api-admin:controllers:qqqq');
import _ from 'lodash';
import {
    ReleaseRule
} from '../../../models';

module.exports = async(req, res, next) => {




    try {
        let data = req.body;
        let ruleNames = ['sameCenter', 'sameUser', 'timeAndRole', 'excludeRoles'];

        _.map(ruleNames, async (ruleName) => {
            let upsertData = {};
            switch (ruleName) {
                case 'sameCenter':
                    upsertData = {
                        $set : {
                            mixed: { },
                            isOn : data.sameCenterSwitch === 'on' ? true : false
                        }
                    }
                    break;
                case 'sameUser':
                    upsertData = {
                        $set : {
                            mixed: { },
                            isOn : data.sameUserSwitch === 'on' ? true : false
                        }
                    }
                    break;
                case 'timeAndRole':
                    let mixed = [];
                    if(data.timeAndRoleCenterIds && !_.isArray(data.timeAndRoleCenterIds)){
                        data.timeAndRoleCenterIds = [data.timeAndRoleCenterIds];
                        data.timeAndRoleStartHours = [data.timeAndRoleStartHours];
                        data.timeAndRoleEndHours = [data.timeAndRoleEndHours];
                        data.timeAndRoleStartMinutes = [data.timeAndRoleStartMinutes];
                        data.timeAndRoleEndMinutes = [data.timeAndRoleStartMinutes];
                    }
                    _.forEach(data.timeAndRoleCenterIds, (centerId, index)=>{
                        mixed.push({
                            centerId : centerId,
                            startHour : data.timeAndRoleStartHours[index],
                            startMinute : data.timeAndRoleStartMinutes[index],
                            endHour : data.timeAndRoleEndHours[index],
                            endMinute : data.timeAndRoleEndMinutes[index],
                            roleIds : data[`timeAndRoleRoleIds[${index}]`]
                        });
                    });
                    upsertData = {
                        $set : {
                            mixed: mixed,
                            isOn : data.timeAndRoleSwitch === 'on' ? true : false
                        }
                    }
                    break;
                case 'excludeRoles':
                    if(data.excludeRoleIds && !_.isArray(data.excludeRoleIds)){
                        data.excludeRoleIds = [data.excludeRoleIds];
                    }
                    upsertData = {
                        $set : {
                        mixed: { excludeRoleIds: data.excludeRoleIds || [] },
                        isOn : data.excludeRolesSwitch === 'on' ? true : false
                        }
                    }
                    break;
                default:
                    break;
            }
            let updatedRule = await ReleaseRule.findOneAndUpdateAsync({
                name: ruleName
            }, upsertData, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            });

        });

        return res.json({});
    } catch (err) {
        return next(err);
    }
};