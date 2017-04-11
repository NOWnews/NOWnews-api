
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:postBoard:removeMessage');

import _ from 'lodash';
import { PostBoard } from '../../../models';

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;
        let { UpdatedBy, messageId } = req.body;

        let cursor = PostBoard.findById(id)
            .where('isTrashed').equals(false);

        let post = await cursor
            .execAsync();

        if(!post) {
            throw new Error('24003');
        }

        let messages = post.messages;

        messages = _.remove(post.messages, (obj) => {
            return obj.id != messageId;
        });

        post.set('messages', messages);
        post.set('UpdatedBy', UpdatedBy);

        let removedPost = await post.saveAsync();

        return res.json({removedPost});
    }catch(err) {
        return next(err);
    }
};
