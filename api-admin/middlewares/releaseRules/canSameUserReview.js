import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:middlewares:releaseRules:canSameUserReview');
import moment from 'moment-timezone';

module.exports = async (req, res, next) => {
    try {
        let canSameUserReviewData = req.releaseRules && req.releaseRules.canSameUserReview || {};
        if(req.authedRelease || canSameUserReviewData.isOn){
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
