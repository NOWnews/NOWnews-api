/*
 * 驗證 postBoard create 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:postBoard:create');

import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let {
        content,
        CreatedBy
    } = req.body;

    if(!content || content === '') {
        throw new Error('24001');
    }

    if(!mongoose.Types.ObjectId.isValid(CreatedBy)) {
        throw new Error('24002');

    }

    return next();
};
