
import compression from 'compression';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import parseHeader from './parseHeader';
import prepare from './prepare';

module.exports = (app) => {

    app.use(prepare());
    app.use(cors());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '100mb'
    }));
    app.use(parseHeader());
    app.use(logger('dev'));
    // app.use(logger('(REQUEST LOG)- [method] :method [url] :url  [status] :status  [response-time] :response-time ms'));

    return (req, res, next) => {
        return next();
    };
};