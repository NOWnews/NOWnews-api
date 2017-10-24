import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:releaseRule:createTimeAndRole');
import { ReleaseRule } from '../../../models';

module.exports = async(req, res, next) => {
    try {
        let {
            centerId,
            startHour,
            startMinute,
            endHour,
            endMinute,
            roleIds,
            UpdatedBy,
            CreatedBy
        } = req.body;
        let releaseRule = await ReleaseRule.findOne().sort({
            createdAt: -1
        });
        if (releaseRule) {
            releaseRule.rules.timeAndRole.setting.push({
                centerId,
                startHour,
                startMinute,
                endHour,
                endMinute,
                roleIds
            });
            let updatedReleaseRule = await releaseRule.saveAsync();
            return res.json(updatedReleaseRule);
        }

        let rr = await ReleaseRule.createAsync({
            CreatedBy: CreatedBy,
            UpdatedBy: UpdatedBy
        });
        rr = await rr.saveAsync();
        rr.rules.timeAndRole.setting.push({
            centerId,
            startHour,
            startMinute,
            endHour,
            endMinute,
            roleIds
        });
        let updatedReleaseRule = await rr.saveAsync();
        return res.json(updatedReleaseRule);

    } catch (err) {
        return next(err);
    }
};