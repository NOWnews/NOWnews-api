/*
 * 驗證 Image clone 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:image:clone');

import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let {
        id,
        desc,
        CreatedBy
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('15003');
    }

    if(!desc || desc === '') {
        throw new Error('15002');
    }

    if(!mongoose.Types.ObjectId.isValid(CreatedBy)) {
        throw new Error('15004');
    }

    return next();
};