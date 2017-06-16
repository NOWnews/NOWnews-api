/*
 * 驗證 postBoard create 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:dailyPlan:create');

import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let {
        title,
        startedAt,
        content,
        CreatedBy,
        Center
    } = req.body;

    if(!title || title === '') {
        throw new Error('25001');
    }

    if(!startedAt) {
        throw new Error('25005');
    }

     if(!Center) {
        throw new Error('25006');
    }

    if(!mongoose.Types.ObjectId.isValid(CreatedBy)) {
        throw new Error('25003');

    }

    return next();
};
