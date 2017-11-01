import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:middlewares:releaseRules:canSameCenterReview');
import mongoose from 'mongoose';
module.exports = async (req, res, next) => {
    try {
        let canSameCenterReviewData = req.releaseRules && req.releaseRules.canSameCenterReview || {};
        if(req.authedRelease || !canSameCenterReviewData.isOn){
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
