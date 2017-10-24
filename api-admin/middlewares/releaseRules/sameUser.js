
import moment from 'moment-timezone';

module.exports = async (req, res, next) => {
    try {
        let sameUserData = req.releaseRules && req.releaseRules.sameUser || {};
        if(req.authedRelease || !sameUserData.isOn){
            return next();
        }
        // 發布的人不應該是自己，應該會是其他人
        let { UpdatedBy } = req.body;
        if (UpdatedBy === req.news.CreatedBy._id.toString()) {
            throw new Error('16010');
        }
        return next();
    }catch(err) {
        return next(err);
    }
};
