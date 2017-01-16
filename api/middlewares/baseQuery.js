
import config from 'config';
import is from 'is_js';

module.exports = (req, res ,next) => {
    // 如果不是 GET method，就直接跳出
    if(req.method !== 'GET') {
        return next();
    }

    let limit = parseInt(req.query.limit, 10);
    let page = parseInt(req.query.page, 10);
    let skip = parseInt(req.query.skip, 10);
    // console.log(config.get('baseQuery.page'));
    // console.log(is.nan(page));

    req.query.limit = is.nan(limit) ? config.get('baseQuery.limit') : Math.max(0, limit);
    req.query.page = is.nan(page) ? config.get('baseQuery.page') : Math.max(1, page);
    req.query.skip = is.nan(skip) ? (req.query.page - 1)*req.query.limit : Math.max(0, skip);
    // console.log(req.query.page);
    return next();
};