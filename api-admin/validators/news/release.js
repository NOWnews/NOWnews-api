/*
 * 驗證 News release 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:news:release');

import _ from 'lodash';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let {
        title,
        content,
        newsBy,
        Author,
        MainMenu,
        UpdatedBy,
        UpdateUserRole
    } = req.body;


    if(!title || title === '') {
        throw new Error('16001');
    }

    if(!content || content === '') {
        throw new Error('16004');
    }

    if(!mongoose.Types.ObjectId.isValid(Author)) {
        throw new Error('16006');
    }

    if(!mongoose.Types.ObjectId.isValid(UpdatedBy)) {
        throw new Error('16005');
    }

    if(!mongoose.Types.ObjectId.isValid(MainMenu)) {
        throw new Error('16011');
    }

    if(!newsBy || newsBy === '') {
        throw new Error('16012');
    }

    if(!mongoose.Types.ObjectId.isValid(UpdateUserRole)) {
        throw new Error('16015');
    }

    return next();
};
