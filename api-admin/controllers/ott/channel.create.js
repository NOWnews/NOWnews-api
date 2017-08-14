
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:create');
const uuidv4 = require('uuid/v4');

import Promise from 'bluebird';
import _ from 'lodash';

import fs from 'fs';

import { getChannelsByPlatform } from '../../../libs';
import redis from '../../../redis';
import { Channel, Category, Provider } from '../../../ottModels';

module.exports = async (req, res, next) => {
    try {

        let {
            providerId,
            categoryId,
            title,
            path,
            CreatedBy
        } = req.body;

        let [ channel, provider ] = await Promise.all([
            Channel.findOne()
                .where('Provider').equals(providerId)
                .where('Category').equals(categoryId)
                .where('path').equals(path)
                .where('isTrashed').equals(false)
                .execAsync(),
            Provider.findById(providerId).execAsync()
        ]);

        if(channel) {
            throw new Error('28003');
        }

        if(!provider) {
            throw new Error('28002');
        }

        let newChannel = await Channel.createAsync({
            Provider: providerId,
            Category: categoryId,
            title,
            path,
            CreatedBy,
            UpdatedBy: CreatedBy
        });
        debug('new channel = %j', newChannel);

        let category = await Category.findById(categoryId)
            .where('isTrashed').equals(false)
            .execAsync();

        category.channels.push(newChannel._id);

        await category.saveAsync();

        let result = await getChannelsByPlatform(provider.platform);
        await redis.setValue(`OTTProvider${provider.platform}`, result);

        return res.status(200).json(newChannel);
    } catch (err) {
        return next(err);
    }
};
