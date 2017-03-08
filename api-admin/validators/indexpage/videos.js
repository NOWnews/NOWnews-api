/*
 * 驗證 indexPage videos 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:indexPage:videos');

import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {
    let {
        videos,
        UpdatedBy
    } = req.body;

    if (is.not.array(videos)) {
        throw new Error('22004');
    }

    if(!mongoose.Types.ObjectId.isValid(UpdatedBy)) {
        throw new Error('22005');
    }

    return next();
};