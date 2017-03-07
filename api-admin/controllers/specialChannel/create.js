
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialChannel:create');

import _ from 'lodash';

import { SpecialChannel } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let options = _.pick(req.body, ['title', 'MainPhoto', 'newsList', 'CreatedBy']);
        debug('options = %j', options);

        options.UpdatedBy = req.body.CreatedBy;

        let newSpecialChannel = await SpecialChannel.createAsync(options);
        debug('new specialChannel = %j', newSpecialChannel);

        return res.json(newSpecialChannel);
    } catch (err) {
        return next(err);
    };
};