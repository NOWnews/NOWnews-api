/*
 * 驗證 indexPage specialTopics 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:indexPage:specialTopics');

import config from 'config';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {
    let {
        specialTopics,
        UpdatedBy
    } = req.body;

    if (is.not.array(specialTopics)) {
        throw new Error('22003');
    }

    if (specialTopics.length > config.get('indexpage.specialTopics')) {
        throw new Error('22006');
    }

    if(!mongoose.Types.ObjectId.isValid(UpdatedBy)) {
        throw new Error('22005');
    }

    return next();
};