
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:category.create');

import Promise from 'bluebird';
import _ from 'lodash';

import { getChannelsByPlatform } from '../../../libs';
import redis from '../../../redis';
import { Provider, Category } from '../../../ottModels';

module.exports = async (req, res, next) => {

    try {

        let {
            name,
            categoryName,
            CreatedBy,
            providerId
        } = req.body;
        debug('req.body = %j', req.body);


        let [ category, provider ] = await Promise.all([
            Category.findOne()
                .where('Provider').equals(providerId)
                .where('categoryName').equals(categoryName)
                .where('isTrashed').equals(false)
                .execAsync(),
            Provider.findById(providerId)
                .where('isTrashed').equals(false)
                .execAsync()
        ]);

        if(category) {
            throw new Error('28001');
        }

        if(!provider) {
            throw new Error('28002');
        }

        let newCategory = await Category.createAsync({
            Provider: providerId,
            name,
            categoryName,
            CreatedBy,
            UpdatedBy: CreatedBy
        });

        provider.data.push(newCategory._id);

        provider.saveAsync();

        debug('new category = %j', newCategory);

        let result = await getChannelsByPlatform(provider.platform);
        await redis.setValue(`OTTProvider${provider.platform}`, result);

        return res.status(200).json(newCategory);
    } catch (err) {
        return next(err);
    }
};
