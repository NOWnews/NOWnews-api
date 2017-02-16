
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:news:create');

import _ from 'lodash';

import { News } from '../../../models';
import { Total } from '../../../pvModels';
import { newsLog } from '../../../libs';

module.exports = async (req, res, next) => {

    try {

        let options = _.pick(req.body, [
            'title',
            'shortTitle',
            'summary',
            'MainMenu',
            'Menus',
            'MainPhoto',
            'MainVideo',
            'content',
            'Photos',
            'Videos',
            'freeContent',
            'startedAt',
            'type',
            'status',
            'traceCode',
            'isAdult',
            'isDeliver',
            'isSponsored',
            'location',
            'Author',
            'Tags',
            'CreatedBy'
        ]);

        let isAdult = options.isAdult === true ? true : false;
        options.isAdult = isAdult;

        let isDeliver = options.isDeliver === true ? true : false;
        options.isDeliver = isDeliver;

        options.UpdatedBy = options.CreatedBy;

        if(!options.Author) {
            options.Author = options.CreatedBy;
        }

        debug('options = %j', options);

        let newNews = await News.createAsync(options);
        debug('new news = %j', newNews);

        let foo = await Total.createAsync({
            newsId: newNews._id
        });
        debug('foo = %j', foo);

        // 處理 log
        await newsLog(newNews);

        return res.json(newNews);
    }catch(err) {
        return next(err);
    }
};