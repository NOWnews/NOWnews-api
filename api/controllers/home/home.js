
import models from '../../../models';

module.exports = (req, res, next) => {
    // 確認端點是否正常 work
    return res.send('<h1>Hello World!</h1>');
};