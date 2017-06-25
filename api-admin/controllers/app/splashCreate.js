
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:app:splashCreate');

import { AppSplash } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { device, imageId, CreatedBy } = req.body;

        let newSplash = await AppSplash.createAsync({
            device,
            Image: imageId,
            CreatedBy,
            UpdatedBy: CreatedBy
        });
        debug('new app splash = %j', newSplash);

        return res.json(newSplash);
    } catch(err) {
        return next(err);
    }
};
