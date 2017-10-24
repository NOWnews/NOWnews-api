import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:releaseRule:create');
import { ReleaseRule } from '../../../models';

module.exports = async(req, res, next) => {
    try {
        let data = req.body;
        let upsertData = {
            CreatedBy: data.CreatedBy,
            UpdatedBy: data.UpdatedBy
        };
        upsertData.rules = {
            'excludeRoles': {
                isOn: data.excludeRolesSwitch,
                setting: {
                    roleIds: data.excludeRoleIds || []
                }
            },
            'timeAndRole': {
                isOn: data.timeAndRoleSwitch,
                setting: data.timeAndRole.setting || []
            },
            'sameCenter': {
                isOn: data.sameCenterSwitch
            },
            'sameUser': {
                isOn: data.sameUserSwitch
            }
        };
        let updatedRule = await ReleaseRule.findOneAndUpdateAsync({}, upsertData, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        });

        return res.json(updatedRule);
    } catch (err) {
        return next(err);
    }
};