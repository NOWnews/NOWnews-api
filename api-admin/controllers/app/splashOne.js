
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:app:splashCreate');

import { AppSplash } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { device } = req.query;

        device = device || 'PHONE';

        let splash = await AppSplash.findOne()
            .where('isTrashed').equals(false)
            .where('device').equals(device)
            .sort('-createdAt')
            .populate('Image')
            .execAsync();
        debug('splash = %j', splash);

        return res.json(splash);
    } catch(err) {
        return next(err);
    }
};
