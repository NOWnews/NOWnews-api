
import config from 'config';

let mode = config.get('web.mode');
let keys = config.get('web.header.X-NOWnews-API');

module.exports = (app) => {

    return (req, res, next) => {

        if(mode !== 'production') {
            return next();
        }

        let apiKey = req.header('X-NOWnews-API');

        if(!apiKey || !keys.includes(apiKey)) {
            console.log(`Request Url Without Header Key: ${req.url}`);
            return next(new Error('10001'));
        }

        return next();
    };
};