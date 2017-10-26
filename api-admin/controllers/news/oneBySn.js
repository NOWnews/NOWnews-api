import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:news:oneBySn');

import { News } from '../../../models';

module.exports = async (req, res, next) => {

    const { sn } = req.params;

    try {

        const news = await News.findOne()
            .where('sn').equals(sn)
            .where('isTrashed').equals(false)
            .populate('MainPhoto')
            .execAsync();
        if(!news) {
            throw new Error('16003');
        }
        return res.json(news);
    }catch(err) {
        return next(err);
    }
};
