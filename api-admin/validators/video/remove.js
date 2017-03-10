/*
 * 驗證 Video remove 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:video:remove');

import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let {
        UpdatedBy
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(UpdatedBy)) {
        throw new Error('23003');
    }

    return next();
};