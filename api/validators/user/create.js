/*
 * 驗證 User create 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:validators:user:create');

import _ from 'lodash';

module.exports = (req, res, next) => {
    let { 
        name,
        nickname,
        staffId,
        status,
        Role,
        email,
        password,
        phone,
        Center,
        Department,
        jobTitle,
        profileLink,
        avatar,
        CreatedBy,
        UpdatedBy
    } = req.body;

    if (!name || name === '') {
        throw new Error('11001');
    }

    if (!staffId || staffId === '') {
        throw new Error('11002');
    }

    if (!Role) {
        throw new Error('11003');
    }

    if (!email || email === '') {
        throw new Error('11004');
    }

    if (!password || password === '') {
        throw new Error('11005');
    }

    if (!Center) {
        throw new Error('11006');
    }

    if (!Department) {
        throw new Error('11007');
    }

    if (!jobTitle) {
        throw new Error('11008');
    }

    if (!CreatedBy) {
        throw new Error('11009');
    }

    if (!UpdatedBy) {
        throw new Error('11010');
    }

    return next();
};