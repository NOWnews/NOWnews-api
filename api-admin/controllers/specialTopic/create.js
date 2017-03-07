
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:specialTopic:create');

import _ from 'lodash';

import { SpecialTopic } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let options = _.pick(req.body, ['title', 'MainPhoto', 'url', 'CreatedBy']);
        debug('options = %j', options);

        options.UpdatedBy = req.body.CreatedBy;

        let newSpecialTopic = await SpecialTopic.createAsync(options);
        debug('new specialTopic = %j', newSpecialTopic);

        return res.json(newSpecialTopic);
    } catch (err) {
        return next(err);
    };
};