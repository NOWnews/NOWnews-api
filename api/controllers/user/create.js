
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:user:create');

import _ from 'lodash';

import { User } from '../../../models';
import { hashPwd } from '../../../libs'

module.exports = async (req, res, next) => {
    try{

        // 從 req.body 選出需要的欄位   
        let options = _.pick(req.body, [
            'name',
            'nickname',
            'staffId',
            'status',
            'Role',
            'email',
            'password',
            'phone',
            'Center',
            'Department',
            'jobTitle',
            'profileLink',
            'avatar',
            'CreatedBy'
        ]);

        options.UpdatedBy = req.body.CreatedBy;
        debug('options = %j', options);


        // 驗證這個 email 是否註冊過
        let user = await User.findOne()
            .where('email').equals(options.email)
            .execAsync();
        debug('已經存在的 user = %j', user);

        if(user) {
            throw new Error('110011');
        }

        // 處理 password 編碼問題
        options.password = hashPwd(options.password);

        // 建立新的使用者
        let newUser = await User.createAsync(options);
        debug('創建的新 user = %j', newUser);

        return res.json(newUser);
    } catch (err) {
        return next(err);
    };
};