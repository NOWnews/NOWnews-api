import { User } from '../../../models';
import mongoose from 'mongoose';
module.exports = async (req, res, next) => {
    try {
        let sameCenterData = req.releaseRules.sameCenter || {};
        if(req.authedRelease || !sameCenterData.isOn){
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
