import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:middlewares:releaseRules:canSameCenterReview');
import mongoose from 'mongoose';
module.exports = async (req, res, next) => {
    try {
        let canSameCenterReviewData = req.releaseRules && req.releaseRules.canSameCenterReview || {};
        if(req.authedRelease || !canSameCenterReviewData.isOn){
            return next();
        }

        // 沒有選好 Center 的 User 就略過這個規則
        if(!req.news.CreatedBy.Center || !req.updater.Center){
            return next();
        }

        if(req.news.CreatedBy.Center.toString() === req.updater.Center.toString()){
            req.authedRelease = true;
        }
        return next();
    }catch(err) {
        return next(err);
    }
};
