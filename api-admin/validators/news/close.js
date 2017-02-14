/*
 * 驗證 News close 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:news:close');

import _ from 'lodash';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let { UpdatedBy } = req.body;

    if(!mongoose.Types.ObjectId.isValid(UpdatedBy)) {
        throw new Error('16005');
    }

    return next();
};