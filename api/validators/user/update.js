/*
 * 驗證 User update 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:validators:user:update');

import _ from 'lodash';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let { 
        profileLink,
        UpdatedBy
    } = req.body;
    debug('req.body = %j', req.body);


    if (profileLink && is.not.url(profileLink)) {
        throw new Error('11012');
    }

    if(!mongoose.Types.ObjectId.isValid(UpdatedBy)) {
        throw new Error('11013');
    }

    return next();
};