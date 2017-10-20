import { News } from '../../../models';
import { newsLog } from '../../../libs';
import redis from '../../../redis';
import moment from 'moment-timezone';

module.exports = async (req, res, next) => {
    try {
        if(req.authedRelease){
            return next();
        }
        // 發布的人不應該是自己，應該會是其他人
        let { UpdatedBy} = req.body;
        if (UpdatedBy === req.news.CreatedBy.toString()) {
            throw new Error('16010');
        }
        next();
    }catch(err) {
        return next(err);
    }
};
