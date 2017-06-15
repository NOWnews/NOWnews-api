/*
 * 驗證 postBoard create 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:dailyPlan:create');

import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let {
        title,
        content,
        CreatedBy
    } = req.body;
    console.log('...',req.body);
    if(!title || title === '') {
        throw new Error('25001');
    }

    if(!mongoose.Types.ObjectId.isValid(CreatedBy)) {
        throw new Error('25003');

    }

    return next();
};
