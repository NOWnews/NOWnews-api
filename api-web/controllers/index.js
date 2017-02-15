
import news from './news';

module.exports = (app) => {

    app.use('/', news);

    return (req, res, next) => {
        return next();
    };
};
