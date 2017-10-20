import { News, User, ReleaseRule } from '../../../models';
import _ from 'lodash';
module.exports = async (req, res, next) => {
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

        let releaseRules = await ReleaseRule.find()
            .where('isOn').equals(true)
            .where('isTrashed').equals(false);

        if(_.isEmpty(releaseRules)){
            req.releaseRules = {};
        }else{
            req.releaseRules = _.keyBy(releaseRules,'name');
        }

        return next();

    }catch(err) {
        return next(err);
    }
};
