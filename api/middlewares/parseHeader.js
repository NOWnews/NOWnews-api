
import config from 'config';

let mode = config.get('mode');
let keys = config.get('header.X-NOWnews-API');

module.exports = (app) => {

    return (req, res, next) => {

        if(mode !== 'production') {
            return next();
        }

        let apiKey = req.header('X-NOWnews-API');

        if(!apiKey || !keys.includes(apiKey)) {
            return next(new Error('10001'));
        }

        return next();
    };
};