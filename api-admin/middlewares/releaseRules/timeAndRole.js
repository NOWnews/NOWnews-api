import { User } from '../../../models';
import moment from 'moment-timezone';
import _ from 'lodash';
module.exports = async(req, res, next) => {
    try {
        let timeAndRoleData = req.releaseRules.timeAndRole || {};
        if (req.authedRelease || !timeAndRoleData.isOn) {
            return next();
        }
        timeAndRoleData = timeAndRoleData.mixed;

        if (_.isEmpty(timeAndRoleData)) {
            return next();
        }
        let centerId = req.updater.Center.toString();
        let roleId = req.updater.Role.toString();
        _.forEach(timeAndRoleData, (t) => {
            let now = moment.tz('Asia/Taipei');
            var startTime = moment.tz(`${t.startHour}:${t.startMinute}:00`, 'HH:mm:ss', 'Asia/Taipei');
            var endTime = moment.tz(`${t.endHour}:${t.endMinute}:59`, 'HH:mm:ss', 'Asia/Taipei');
            if (t.roleIds.includes(roleId) &&
                centerId == t.centerId &&
                (now.isSameOrAfter(startTime) && now.isSameOrBefore(endTime))
            ) {
                req.authedRelease = true;
            }
        });

        return next();

    } catch (err) {
        return next(err);
    }
};