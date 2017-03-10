/*
 * 驗證 Video create 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:video:create');

import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let {
        url,
        CreatedBy
    } = req.body;

    if(!url || url === '') {
        throw new Error('23004');
    }

    if(!mongoose.Types.ObjectId.isValid(CreatedBy)) {
        throw new Error('23002');
    }

    return next();
};