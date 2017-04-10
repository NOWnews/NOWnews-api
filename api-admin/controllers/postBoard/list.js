
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:postBoard:list');

import { PostBoard } from '../../../models';

module.exports = async (req, res, next) => {

    let { sort } = req.query;

    try {

        sort = sort ? sort : '-createdAt';

        let cursor = PostBoard.find()
            .where('isTrashed').equals(false)
            .sort(sort);

        let postBoardList = await cursor
            .deepPopulate('CreatedBy.Avatar messages.user.Avatar')
            .execAsync();

        debug('post board list = %j', postBoardList);

        return res.json(postBoardList);
    }catch(err) {
        return next(err);
    }
};
