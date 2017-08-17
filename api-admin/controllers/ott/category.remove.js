
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:category.remove');

import Promise from 'bluebird';
import _ from 'lodash';

import { getChannelsByPlatform } from '../../../libs';
import redis from '../../../redis';
import { Provider, Category } from '../../../ottModels';

module.exports = async (req, res, next) => {
    try {
        let { id } = req.params;

        let removedCategory = await Category.findOneAndUpdateAsync({
            _id: id,
        }, {
            $set: { isTrashed: true }
        }, {
            new: true
        });

        let provider = await Provider.findOne()
            .where('data').in([removedCategory._id])
            .execAsync();

        provider.data.pull(removedCategory._id);

        await provider.saveAsync();

        let result = await getChannelsByPlatform(provider.platform);
        await redis.setValue(`OTTProvider${provider.platform}`, result);

        return res.status(200).json(removedCategory);
    } catch (err) {
        return next(err);
    }
};
