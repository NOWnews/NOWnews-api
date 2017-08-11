
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:create');
const uuidv4 = require('uuid/v4');

import Promise from 'bluebird';
import _ from 'lodash';

import fs from 'fs';

import redis from '../../../redis';
import { Channel, Category } from '../../../ottModels';

module.exports = async (req, res, next) => {
    try {

        let {
            providerId,
            categoryId,
            title,
            path,
            CreatedBy
        } = req.body;

        let channel = await Channel.findOne()
            .where('Provider').equals(providerId)
            .where('Category').equals(categoryId)
            .where('path').equals(path)
            .where('isTrashed').equals(false)
            .execAsync();

        if(channel) {
            console.log('此服務的此分類已經有這個頻道連結');
            throw new Error('')
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

        return res.status(200).json(newChannel);
    } catch (err) {
        return next(err);
    }
};
