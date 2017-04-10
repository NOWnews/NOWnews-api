/*
 * 驗證 User create 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:graffitiWall:create');

import _ from 'lodash';
import is from 'is_js';
import mongoose from 'mongoose';

module.exports = (req, res, next) => {

    let {
        graffiti,
        CreatedBy
    } = req.body;

    if(!graffiti || graffiti === '') {
        throw new Error('24001');
    }

    if(!mongoose.Types.ObjectId.isValid(CreatedBy)) {
        throw new Error('24002');

    }

    return next();
};
