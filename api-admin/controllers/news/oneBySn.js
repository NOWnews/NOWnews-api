import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:news:oneBySn');

import libs from '../../../libs';

module.exports = async (req, res, next) => {

    const { sn } = req.params;

    try {
        const news = await libs.getNewsBySn(sn);

        if(!news) {
            throw new Error('16003');
        }
        
        return res.json(news);
    }catch(err) {
        return next(err);
    }
};
