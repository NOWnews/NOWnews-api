/*
 * 驗證 indexPage addCarousels 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:indexPage:addCarousels');

import config from 'config';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {
    let {
        addCarousels,
        UpdatedAddBy
    } = req.body;

    if (is.not.array(addCarousels)) {
        throw new Error('22001');
    }

    if(!mongoose.Types.ObjectId.isValid(UpdatedAddBy)) {
        throw new Error('22005');
    }

    return next();
};