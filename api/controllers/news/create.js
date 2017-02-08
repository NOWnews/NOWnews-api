
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:news:create');

import _ from 'lodash';

import { News } from '../../../models';
import { newsLog } from '../../../libs';

module.exports = async (req, res, next) => {

    try {

        let options = _.pick(req.body, [
            'title',
            'shortTitle',
            'summary',
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
            'location',
            'Author',
            'Tags',
            'CreatedBy'
        ]);

        if(options.isAdult) {
            let isAdult = options.isAdult === 'true' ? true : false;
            news.set('isAdult', isAdult);
        }

        if(options.isDeliver) {
            let isDeliver = options.isDeliver === 'true' ? true : false;
            news.set('isDeliver', isDeliver);
        }

        options.UpdatedBy = options.CreatedBy;

        if(!options.Author) {
            options.Author = options.CreatedBy;
        }

        debug('options = %j', options);

        let newNews = await News.createAsync(options);
        debug('new news = %j', newNews);

        // 處理 log
        await newsLog(newNews);

        return res.json(newNews);
    }catch(err) {
        return next(err);
    }
};