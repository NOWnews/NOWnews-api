// import Debug from 'debug';
// const debug = Debug('NOWnews-api:api-admin:controllers:qqqq');
import _ from 'lodash';
import {
    ReleaseRule
} from '../../../models';

module.exports = async(req, res, next) => {




    try {
        let data = req.body;
        console.log('data.excludeRoles...',data.excludeRoles);
        // let releaseRules = await ReleaseRule.find().where('isOn').equals(true);
        let ruleNames = ['sameCenter', 'sameUser', 'timeAndRole', 'superiorRoles', 'excludeRoles'];

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
                    upsertData = {
                        $set : {
                            mixed: { },
                            isOn : data.timeAndRoleSwitch === 'on' ? true : false
                        }
                    }
                    break;
                case 'superiorRoles':
                    upsertData = {
                        $set : {
                            mixed: { },
                            isOn : data.superiorRolesSwitch === 'on' ? true : false
                        }
                    }
                    break;
                case 'excludeRoles':
                    upsertData = {
                        $set : {
                        mixed: { excludeRolesIds: data.excludeRoleIds },
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