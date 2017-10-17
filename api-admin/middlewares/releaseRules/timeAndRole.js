import { News } from '../../../models';
import { newsLog } from '../../../libs';
import redis from '../../../redis';
import moment from 'moment-timezone';

module.exports = async (req, res, next) => {
    try {
        let { id } = req.params;

        let news = await News.findById(id)
            .where('isTrashed').equals(false)
            .populate('CreatedBy')
            .execAsync();
        req.news = news;
        next();

    }catch(err) {
        return next(err);
    }
};
