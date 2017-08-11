
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:weight.update');

import Promise from 'bluebird';
import _ from 'lodash';

import redis from '../../../redis';
import { Category, Channel } from '../../../ottModels';

module.exports = async (req, res, next) => {

    try {
        console.log(req.body);
        let { categoryArray, channelArray } = req.body;
        // console.log(categoryArray);
        // console.log(channelArray);


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

        return res.status(200).json({ status: 'ok' });
    } catch (err) {
        return next(err);
    }
};
