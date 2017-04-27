import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:specialtopics:one');

import Promise from 'bluebird';

import { SpecialTopic } from '../../../models';
import { pagination } from '../../../libs';

module.exports = async (req, res, next) => {
    try {

        let { sn } = req.params;

        let specialTopic = await SpecialTopic.findOne()
            .where('sn').equals(sn)
            .where('isTrashed').equals(false)
            .populate('MainPhoto Tag')
            .execAsync();

        if(!specialTopic) {
            throw new Error('');
        }

        return res.json(specialTopic);
    }catch(err) {
        return next(err);
    }
};