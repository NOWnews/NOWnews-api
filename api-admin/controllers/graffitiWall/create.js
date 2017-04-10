
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:graffitiWall:create');

import _ from 'lodash';

import { GraffitiWall } from '../../../models';

module.exports = async (req, res, next) => {

    let options = _.pick(req.body, 'graffiti', 'CreatedBy');
    options.UpdatedBy = options.CreatedBy;

    try {

        let newMemo = await GraffitiWall.createAsync(options);
        debug('new news memo = %j', newMemo);

        return res.json(newMemo);
    }catch(err) {
        return next(err);
    }
};
