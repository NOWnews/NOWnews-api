
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:postBoard:list');

import _ from 'lodash';
import { PostBoard } from '../../../models';

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;
        let { user, message, content, UpdatedBy } = req.body;

        let post = await PostBoard.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

        let updatePostContent = post.content;

        let updatePostMessages = post.messages;


        if (message && message !== ''){
            message = {
                user: user,
                message: message
            }
            updatePostMessages = _.concat(post.messages, message);
        }

        if (content && content !== ''){
            updatePostContent = content;
        }

        post.set('content', updatePostContent);
        post.set('messages', updatePostMessages);
        post.set('UpdatedBy', UpdatedBy);

        let updatedPost = await post.saveAsync();

        return res.json(updatedPost);
    }catch(err) {
        return next(err);
    }
};
