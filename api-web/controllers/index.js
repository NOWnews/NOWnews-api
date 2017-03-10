
import news from './news';
import preview from './preview';

module.exports = (app) => {

    app.use('/', news);
    app.use('/', preview);

    return (req, res, next) => {
        return next();
    };
};
