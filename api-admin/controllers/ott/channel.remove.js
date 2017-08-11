
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:channel.remove');

import Promise from 'bluebird';
import _ from 'lodash';

import redis from '../../../redis';
import { Category, Channel } from '../../../ottModels';

module.exports = async (req, res, next) => {
    try {
        let { id } = req.params;

        let removedChannel = await Channel.findOneAndUpdateAsync({
            _id: id,
        }, {
            $set: { isTrashed: true }
        }, {
            new: true
        });

        let category = await Category.findOne()
            .where('channels').in([removedChannel._id])
            .execAsync();

        category.channels.pull(removedChannel._id);

        await category.saveAsync();

        return res.status(200).json(removedChannel);
    } catch (err) {
        return next(err);
    }
};
