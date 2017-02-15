import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:news:one');

import { News } from '../../../models';

module.exports = async (req, res, next) => {

    let { sn } = req.params;

    try {
        let news = await News.findBySn(sn).execAsync();
        debug('news = %j', news);

        return res.json(news);
    }catch(err) {
        return next(err);
    }
};