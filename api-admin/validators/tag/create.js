/*
 * 驗證 Tag create 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:tag:create');

import _ from 'lodash';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {
    let {
        tags,
        CreatedBy
    } = req.body;

    if (is.not.array(tags) || is.empty(tags) || tags.length > 7) {
        throw new Error('18002');
    }

    if(!mongoose.Types.ObjectId.isValid(CreatedBy)) {
        throw new Error('18003');
    }

    return next();
};