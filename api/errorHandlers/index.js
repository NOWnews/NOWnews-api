
import prettyError from 'pretty-error';
import errorMapping from '../errorCode';

let pe = new prettyError();

module.exports = (app) => {

    app.use(function(err, req, res, next) {

        console.log('-------------- ERROR --------------');
        console.log(errorMapping[err.message]);
        console.log(pe.render(err));
        console.log('-------------- ERROR --------------');

        res.status(errorMapping[err.message].statusCode);
        return res.json({
            message: errorMapping[err.message].message,
            status: errorMapping[err.message].statusCode
        });
    });

    return (req, res, next) => {
        return next();
    };
};