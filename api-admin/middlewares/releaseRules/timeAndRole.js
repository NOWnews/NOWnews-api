import moment from 'moment-timezone';
import _ from 'lodash';
module.exports = async(req, res, next) => {
    try {
        let timeAndRoleData = req.releaseRules && req.releaseRules.timeAndRole || {};
        if (req.authedRelease || !timeAndRoleData.isOn) {
            return next();
        }
        let setting = timeAndRoleData.setting;

        if (_.isEmpty(setting)) {
            return next();
        }
        let centerId = req.updater.Center.toString();
        let roleId = req.updater.Role.toString();
        _.forEach(setting, (s) => {
            let now = moment.tz('Asia/Taipei');
            var startTime = moment.tz(`${s.startHour}:${s.startMinute}:00`, 'HH:mm:ss', 'Asia/Taipei');
            var endTime = moment.tz(`${s.endHour}:${s.endMinute}:59`, 'HH:mm:ss', 'Asia/Taipei');
            if (s.roleIds.includes(roleId) &&
                centerId == s.centerId &&
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