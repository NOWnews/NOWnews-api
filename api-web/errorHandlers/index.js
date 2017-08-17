
import errorMapping from './errorCode';
import config from 'config';
import stackdriverError from '@google-cloud/error-reporting';

const errorReporting = stackdriverError({
    projectId: config.get('general.googleCloud.projectId'),
    keyFilename: config.get('general.googleCloud.keyFilename'),
    logLevel: 5,
    reportUnhandledRejections: true,
    ignoreEnvironmentCheck: true,
    serviceContext: {
        service: 'api-web'
    }
});
const showError = config.get('web.showError');

module.exports = (app) => {

    app.use(function(err, req, res, next) {

        errorReporting.report(err);
        let errorFormat = errorMapping[err.message];

        // 處理 error 訊息
        let options = {};

        // 自定義的 error 處理
        if(errorFormat) {
            options.statusCode = errorFormat.statusCode;
            options.message = errorFormat.message;
        }

        // mongoose error 處理
        if(!errorFormat && err && err.errors) {
            options.statusCode = 503;
            options.message = err.message;
            options.stack = err.errors;
        }

        // 其他底層錯誤處理
        if(!errorFormat && err && !err.errors) {
            options.statusCode = 503;
            options.message = err.message;
            options.stack = err.stack.split('\n');
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
            status: options.statusCode,
            message: options.message
        });
    });

    return (req, res, next) => {
        return next();
    };
};