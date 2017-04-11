
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:postBoard:create');

import _ from 'lodash';

import { PostBoard } from '../../../models';

module.exports = async (req, res, next) => {

    let {content, CreatedBy} = req.body;
    let UpdatedBy = CreatedBy;

    try {

        let postBoard = await PostBoard.createAsync({
            content, CreatedBy, UpdatedBy
        });

        debug('new postBoard = %j', postBoard);

        return res.json({postBoard});
    }catch(err) {
        return next(err);
    }
};
