import { User } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        let excludeRolesData = req.releaseRules && req.releaseRules.excludeRoles || {};
        if(req.authedRelease || !excludeRolesData.isOn){
            return next();
        }
        let { UpdatedBy } = req.body;
        let excludeRoleIds = excludeRolesData.setting.roleIds;
        if ( excludeRoleIds.includes(req.updater.Role.toString()) ) {
            throw new Error('16014');
        }
        return next();
    }catch(err) {
        return next(err);
    }
};
