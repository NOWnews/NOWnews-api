/*
 * 驗證 News review 的資料與相關欄位
 *
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:news:review');

import _ from 'lodash';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let {
        title,
        content,
        newsBy,
        LastReviewer,
        Author,
        MainMenu,
        UpdatedBy
    } = req.body;

    if(!title || title === '') {
        throw new Error('16001');
    }

    if(!content || content === '') {
        throw new Error('16004');
    }

    if(!mongoose.Types.ObjectId.isValid(LastReviewer)) {
        throw new Error('16007');
    }

    if(!mongoose.Types.ObjectId.isValid(Author)) {
        throw new Error('16006');
    }

    if(!mongoose.Types.ObjectId.isValid(UpdatedBy)) {
        throw new Error('16005');
    }

    if(LastReviewer === UpdatedBy) {
        throw new Error('16008');
    }

    if(!mongoose.Types.ObjectId.isValid(MainMenu)) {
        throw new Error('16011');
    }

    if(!newsBy || newsBy === '') {
        throw new Error('16012');
    }


    return next();
};
