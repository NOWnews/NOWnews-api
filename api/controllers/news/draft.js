
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:news:draft');

import { News } from '../../../models';
import { newsLog } from '../../../libs';

module.exports = async (req, res, next) => {
    try {

        let { UpdatedBy } = req.body;
        let { id } = req.params;

        let news = await News.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('news = %j', news);

        if(!news) {
            throw new Error('16003');
        }

        news.set('status', 'DRAFT');
        news.set('UpdatedBy', UpdatedBy);

        let updatedNews = await news.saveAsync();
        debug('update news = %j', updatedNews);

        // 處理 log
        await newsLog(updatedNews, 'UPDATE');

        return res.json(updatedNews);
    }catch(err) {
        return next(err);
    }
};