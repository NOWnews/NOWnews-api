/*
 * 驗證 Role create 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:validators:role:create');

import _ from 'lodash';
import is from 'is_js';

module.exports = (req, res, next) => {

    let { name, policies, CreatedBy, UpdatedBy } = req.body;

    policies = JSON.parse(policies);

    if(!name || name === '') {
        throw new Error('12001');
    }

    if(is.not.array(policies) || policies.length === 0) {
        throw new Error('12002');
    }

    if (!CreatedBy) {
        throw new Error('12004');
    }

    if (!UpdatedBy) {
        throw new Error('12005');
    }

    policies.forEach((policy) => {
        if(is.not.string(policy)) {
            throw new Error('12006');
        }
    });

    return next();
};