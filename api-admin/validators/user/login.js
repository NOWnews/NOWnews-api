/*
 * 驗證 User login 的資料與相關欄位
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:validators:user:login');

module.exports = (req, res, next) => {

    let { 
        email,
        password
    } = req.body;

    if (!email || email === '') {
        throw new Error('11004');
    }

    if(!password) {
        throw new Error('11005');
    }

    return next();
};