/*
 * 驗證 News create 的資料與相關欄位
 * 因為在儲存新聞的時候，可能只有存成「草稿」，所以在建立新聞的時候不能做太多的驗證
 * 詳細的驗證應該要在 Update 新聞狀態的時候去做
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:validators:news:create');

import _ from 'lodash';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let {
        title,
        CreatedBy
    } = req.body;

    if(!title || title === '') {
        throw new Error('16001');
    }

    if(!mongoose.Types.ObjectId.isValid(CreatedBy)) {
        throw new Error('16002');
    }

    return next();
};