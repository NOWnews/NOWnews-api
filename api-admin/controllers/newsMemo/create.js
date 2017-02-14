
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:newsMemo:create');

import _ from 'lodash';

import { NewsMemo } from '../../../models';

module.exports = async (req, res, next) => {

    let options = _.pick(req.body, 'News', 'content', 'CreatedBy');
    options.UpdatedBy = options.CreatedBy;

    try {

        let newMemo = await NewsMemo.createAsync(options);
        debug('new news memo = %j', newMemo);

        return res.json(newMemo);
    }catch(err) {
        return next(err);
    }
};