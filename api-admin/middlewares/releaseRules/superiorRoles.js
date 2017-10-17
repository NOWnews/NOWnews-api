import { Role } from '../../../models';
import { newsLog } from '../../../libs';
import redis from '../../../redis';
import moment from 'moment-timezone';

module.exports = async (req, res, next) => {
    try {
        if(req.authedRelease){
           return next();
        }
        //檢查role的SuperiorRoles
        let { UpdateUserRole } = req.body;
        const role = await Role.findOne()
            .where('_id').equals(req.news.CreatedBy.Role)
            .where('isTrashed').equals(false)
            .where('SuperiorRoles').equals(UpdateUserRole)
            .execAsync();
        if(!role) {
            throw new Error('16014');
        }
        next();
    }catch(err) {
        return next(err);
    }
};
