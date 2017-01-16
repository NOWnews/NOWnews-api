/*
 * 驗證 User create 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:validators:user:create');

import _ from 'lodash';
import is from 'is_js';

module.exports = (req, res, next) => {
    let { 
        name,
        email,
        password,
        CreatedBy,
        UpdatedBy
    } = req.body;

    if (!name || name === '') {
        throw new Error('11001');
    }

    // if (!nickname || nickname === '') {
    //     throw new Error('11002');
    // }

    // if (!staffId || staffId === '') {
    //     throw new Error('11002');
    // }

    // if (!Role) {
    //     throw new Error('11003');
    // }

    if (is.email(email)) {
        throw new Error('11004');
    }

    if (!password || password === '') {
        throw new Error('11005');
    }

    // if (!Center) {
    //     throw new Error('11006');
    // }

    // if (!Department) {
    //     throw new Error('11007');
    // }

    // if (!jobTitle) {
    //     throw new Error('11008');
    // }

    if (!CreatedBy) {
        throw new Error('11009');
    }

    if (!UpdatedBy) {
        throw new Error('11010');
    }

    return next();
};