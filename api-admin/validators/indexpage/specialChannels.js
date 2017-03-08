/*
 * 驗證 indexPage specialChannels 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:indexPage:specialChannels');

import config from 'config';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {
    let {
        specialChannels,
        UpdatedBy
    } = req.body;

    if (is.not.array(specialChannels)) {
        throw new Error('22002');
    }

    if (specialChannels.length > config.get('indexpage.specialChannels')) {
        throw new Error('22006');
    }

    if(!mongoose.Types.ObjectId.isValid(UpdatedBy)) {
        throw new Error('22005');
    }

    return next();
};