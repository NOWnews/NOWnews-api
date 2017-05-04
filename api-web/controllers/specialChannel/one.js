import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:specialChannel:one');

import Promise from 'bluebird';

import { SpecialChannel } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { sn } = req.params;

        let specialChannel = await SpecialChannel.findOne()
            .where('sn').equals(sn)
            .where('isTrashed').equals(false)
            .populate('newsList')
            .deepPopulate('newsList.MainMenu newsList.MainPhoto')
            .execAsync();

        return res.json(specialChannel);
    }catch(err) {
        return next(err);
    }
};
