import { News } from '../../../models';

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
