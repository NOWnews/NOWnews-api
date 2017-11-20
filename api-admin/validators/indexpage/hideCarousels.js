/*
 * 驗證 indexPage hideCarousels 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:indexPage:hideCarousels');

import config from 'config';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {
    let {
        hideCarousels,
        UpdatedHideBy
    } = req.body;

    if (is.not.array(hideCarousels)) {
        throw new Error('22001');
    }

    if (hideCarousels.length > config.get('admin.indexpage.hideCarousels')) {
        throw new Error('22006');
    }

    if(!mongoose.Types.ObjectId.isValid(UpdatedHideBy)) {
        throw new Error('22005');
    }

    return next();
};