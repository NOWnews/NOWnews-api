
import prettyError from 'pretty-error';
import errorMapping from './errorCode';

let pe = new prettyError();

module.exports = (app) => {

    app.use(function(err, req, res, next) {

        let errorFormat = errorMapping[err.message];

        // 預期外的錯誤
        if (!errorFormat) {
            console.log('-------------- ERROR --------------');
            console.log(err.errors)
            console.log(err.message)
            console.log('-------------- ERROR --------------');
            res.status(503);
            return res.json({
                message: err.message,
                errorObj: err.errors,
                status: 503
            });
        }

        console.log('-------------- ERROR --------------');
        console.log(pe.render(err));
        console.log(errorFormat);
        console.log('-------------- ERROR --------------');

        res.status(errorFormat.statusCode);
        return res.json({
            message: errorFormat.message,
            status: errorFormat.statusCode
        });
    });

    return (req, res, next) => {
        return next();
    };
};