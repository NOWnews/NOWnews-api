/*
 * 驗證 SpecialChannel create 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:specialChannel:create');

import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {
    let {
        title,
        MainPhoto,
        newsList,
        CreatedBy
    } = req.body;

    if(!title || title === '') {
        throw new Error('21002');
    }

    if(!mongoose.Types.ObjectId.isValid(MainPhoto)) {
        throw new Error('21003');
    }

    if (is.not.array(newsList)) {
        throw new Error('21004');
    }

    if(!mongoose.Types.ObjectId.isValid(CreatedBy)) {
        throw new Error('21005');
    }

    return next();
};