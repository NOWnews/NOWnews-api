/*
 * 驗證 indexPage carousels 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:indexPage:carousels');

import config from 'config';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {
    let {
        carousels,
        UpdatedBy
    } = req.body;

    if (is.not.array(carousels)) {
        throw new Error('22001');
    }

    if (carousels.length > config.get('indexpage.carousels')) {
        throw new Error('22006');
    }

    if(!mongoose.Types.ObjectId.isValid(UpdatedBy)) {
        throw new Error('22005');
    }

    return next();
};