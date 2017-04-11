
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:postBoard:remove');

import { PostBoard } from '../../../models';

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;

        let cursor = PostBoard.findById(id)
            .where('isTrashed').equals(false);

        let post = await cursor
            .execAsync();

        if(!post) {
            throw new Error('24003');
        }

        post.set('isTrashed', true);

        let removedPost = await post.saveAsync();

        return res.json({removedPost});
    }catch(err) {
        return next(err);
    }
};
