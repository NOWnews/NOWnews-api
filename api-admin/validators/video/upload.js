/*
 * 驗證 Video upload 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:video:upload');

import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let {
        CreatedBy
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(CreatedBy)) {
        throw new Error('23002');
    }

    return next();
};