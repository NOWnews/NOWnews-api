
import compression from 'compression';
import logger from 'morgan';
import bodyParser from 'body-parser';

import parseHeader from './parseHeader';

module.exports = (app) => {

    app.use(parseHeader());

    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(logger('dev'));

    return (req, res, next) => {
        return next();
    };
};