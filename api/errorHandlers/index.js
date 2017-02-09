
import errorMapping from './errorCode';
import config from 'config';

let showError = config.get('showError');

module.exports = (app) => {

    app.use(function(err, req, res, next) {

        let errorFormat = errorMapping[err.message];

        // 處理 error 訊息
        let options = {};

        if(errorFormat) {
            options.statusCode = errorFormat.statusCode;
            options.message = errorFormat.message;
        }else {
            options.statusCode = 503;
            options.message = err.message;
            options.stack = err.errors ? err.errors : err.stack.split('\n');
        }

        // 在後台的 log 顯示
        console.error('-------------- ERROR --------------');
        console.error(options);
        console.error('-------------- ERROR --------------');

        // response
        res.status(options.statusCode);
        if(showError) {
            return res.json(options);
        }

        return res.json({
            status: options.statusCode
        });
    });

    return (req, res, next) => {
        return next();
    };
};