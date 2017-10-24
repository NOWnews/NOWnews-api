import { News, User, ReleaseRule } from '../../../models';
module.exports = async(req, res, next) => {
    try {
        let { id } = req.params;
        let { UpdatedBy } = req.body;
        let news = await News.findById(id)
            .where('isTrashed').equals(false)
            .populate('CreatedBy')
            .execAsync();

        req.news = news;

        let updater = await User.findOne()
            .where('_id').equals(UpdatedBy)
            .select('Center Role');

        req.updater = updater;

        let releaseRules = await ReleaseRule
            .findOne({})
            .sort({ createdAt: -1 });

        req.releaseRules = releaseRules && releaseRules.rules || '';

        return next();

    } catch (err) {
        return next(err);
    }
};