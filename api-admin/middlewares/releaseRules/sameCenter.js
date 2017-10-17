import { User } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        if(req.authedRelease){
            return next();
        }
        //如果審稿者和建立者同中心 有權可以發布
        let { UpdatedBy } = req.body;
        let updater = await User.findOne()
            .where('_id').equals(UpdatedBy)
            .select('Center');
        if(req.news.CreatedBy.Center.toString() === updater.Center.toString()){
            req.authedRelease = true;
        }
        next();
    }catch(err) {
        return next(err);
    }
};
