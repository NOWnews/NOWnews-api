import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:releaseRule:list');
import { ReleaseRule } from '../../../models';
module.exports = async (req, res, next) => {
    try {
        let releaseRules = await ReleaseRule
            .findOne({})
            .sort({ CreatedAt : -1 });

        return res.json(releaseRules);
    }catch(err) {
        return next(err);
    }
};
