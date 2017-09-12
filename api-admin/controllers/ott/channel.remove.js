
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:channel.remove');

import Promise from 'bluebird';
import _ from 'lodash';

import { getChannelsByPlatform } from '../../../libs';
import redis from '../../../redis';
import { Category, Channel } from '../../../ottModels';

module.exports = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { UpdatedBy } = req.body;

        let removedChannel = await Channel.findOneAndUpdateAsync({
            _id: id,
        }, {
            $set: { isTrashed: true, UpdatedBy: UpdatedBy }
        }, {
            new: true
        });

        let category = await Category.findOne()
            .where('channels').in([removedChannel._id])
            .execAsync();

        category.channels.pull(removedChannel._id);

        let updatedCategory = await category.saveAsync();


        updatedCategory = await updatedCategory.populate('Provider').execPopulate();

        let result = await getChannelsByPlatform(updatedCategory.Provider.platform);
        await redis.setValue(`OTTProvider${updatedCategory.Provider.platform}`, result);

        return res.status(200).json(removedChannel);
    } catch (err) {
        return next(err);
    }
};
