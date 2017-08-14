
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:weight.update');

import Promise from 'bluebird';
import _ from 'lodash';

import redis from '../../../redis';
import { getChannelsByPlatform } from '../../../libs';
import { Category, Channel, Provider } from '../../../ottModels';

module.exports = async (req, res, next) => {

    try {
        let { categoryArray, channelArray } = req.body;

        await Promise.all([
            Promise.map(categoryArray, (category) => {
                return Category.findOneAndUpdateAsync({
                        _id: category._id
                    },
                    {
                        $set:{ weight: category.weight }
                    });
            }, { concurrency: 10 }),
            Promise.map(channelArray, (channel) => {
                return Channel.findOneAndUpdateAsync({
                        _id: channel._id
                    },
                    {
                        $set:{ weight: channel.weight }
                    });
            }, { concurrency: 10 }),
        ]);

        let providers = Provider.find()
            .where('isTrashed').equals(false)
            .execAsync();

        await Promise.map(providers, (provider) => {
            return getChannelsByPlatform(provider.platform)
                .then((result) => {
                    return redis.setValue(`OTTProvider${provider.platform}`, result);
                });
        });

        return res.status(200).json({ status: 'ok' });
    } catch (err) {
        return next(err);
    }
};
