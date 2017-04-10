
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:postBoard:one');

import { PostBoard } from '../../../models';

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;

        let cursor = PostBoard.findById(id)
            .where('isTrashed').equals(false);

        let post = await cursor
            .deepPopulate('CreatedBy.Avatar messages.user.Avatar')
            .execAsync();

        if(!post) {
            throw new Error('24003');
        }

        debug('this post = %j', post);

        return res.json(post);
    }catch(err) {
        return next(err);
    }
};
