
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:tag:create');

import _ from 'lodash';
import Promise from 'bluebird';

import { Tag } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let options = _.pick(req.body, 'tags', 'type', 'CreatedBy');
        options.type = options.type ? options.type : 'NEWS';

        let tagList = await Promise.mapSeries(options.tags, (tag) => {

            // 變成小寫與去除頭尾空白
            tag = tag.trim().toLowerCase();

            return Tag.findOne()
                .where('name').equals(tag)
                .where('type').equals(options.type)
                .where('isTrashed').equals(false)
                .execAsync()
                .then((aliveTag) => {

                    // 如果有存在的 tag 就直接吐出去
                    if(aliveTag) {
                        return Promise.resolve(aliveTag);
                    }

                    // 沒有這個 tag 就幫他建立
                    return Tag.createAsync({
                        name: tag,
                        type: options.type,
                        CreatedBy: options.CreatedBy,
                        UpdatedBy: options.CreatedBy
                    });
                });
        });
        debug('tag list = %j', tagList);

        return res.json(tagList);
    } catch (err) {
        return next(err);
    };
};