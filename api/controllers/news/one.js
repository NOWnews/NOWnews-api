import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:news:one');

import { News } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;

    try {

        let news = await News.findById(id)
            .where('isTrashed').equals(false)
            .populate('Author LastReviewer CreatedBy UpdatedBy MainMenu Menus')
            .execAsync();

        if(!news) {
            throw new Error('16003');
        }

        return res.json(news);
    }catch(err) {
        return next(err);
    }
};