/*
 * 驗證 Menu create 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:menu:create');

import _ from 'lodash';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let {
        name,
        url,
        CreatedBy
    } = req.body;

    if(!name || name === '') {
        throw new Error('19001');
    }

    if(!url || url === '') {
        throw new Error('19002');
    }

    if(!mongoose.Types.ObjectId.isValid(CreatedBy)) {
        throw new Error('19003');
    }

    return next();
};