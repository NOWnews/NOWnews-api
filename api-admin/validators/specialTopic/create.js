/*
 * 驗證 SpecialTopic create 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:specialTopic:create');

import mongoose from 'mongoose';

module.exports = (req, res, next) => {
    let {
        title,
        MainPhoto,
        url,
        CreatedBy
    } = req.body;

    if(!title || title === '') {
        throw new Error('20002');
    }

    if(!url || url === '') {
        throw new Error('20003');
    }

    if(!mongoose.Types.ObjectId.isValid(MainPhoto)) {
        throw new Error('20004');
    }

    if(!mongoose.Types.ObjectId.isValid(CreatedBy)) {
        throw new Error('20005');
    }

    return next();
};