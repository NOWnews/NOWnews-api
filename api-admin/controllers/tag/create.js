
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:tag:create');

import _ from 'lodash';

import { Tag } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let options = _.pick(req.body, 'name', 'type', 'CreatedBy');
        options.UpdatedBy = options.CreatedBy;
        options.type = options.type ? options.type : 'NEWS';
        debug('options = %j', options);

        let tag = await Tag.findOne()
            .where('name').equals(options.name)
            .where('type').equals(options.type)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('alive tag = %j', tag);

        if(tag) {
            throw new Error('18001');
        }

        let newTag = await Tag.createAsync(options);
        debug('new tag = %j', newTag);

        return res.json(newTag);
    } catch (err) {
        return next(err);
    };
};