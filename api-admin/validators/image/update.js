/*
 * 驗證 Image update 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:image:update');

import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let {
        desc,
        UpdatedBy
    } = req.body;

    if(!desc || desc === '') {
        throw new Error('15002');
    }

    if(!mongoose.Types.ObjectId.isValid(UpdatedBy)) {
        throw new Error('15005');
    }

    return next();
};