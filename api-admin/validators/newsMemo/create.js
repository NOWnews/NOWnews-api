/*
 * 驗證 User create 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:newsMemo:create');

import _ from 'lodash';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let { 
        News,
        content,
        CreatedBy
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(News)) {
        throw new Error('17001');
    }

    if(!content || content === '') {
        throw new Error('17002');
    }

    if(!mongoose.Types.ObjectId.isValid(CreatedBy)) {
        throw new Error('17003');
    }

    return next();
};