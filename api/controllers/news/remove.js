import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:news:remove');

import { News } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;

    try {

        let news = await News.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

        if(!news) {
            throw new Error('16003');
        }

        news.set('isTrashed', true);

        let removedNews = await news.saveAsync();
        debug('removed news = %j', removedNews);

        return res.json(removedNews);
    }catch(err) {
        return next(err);
    }
};