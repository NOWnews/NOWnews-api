
import news from './news';
import menu from './menu';
import preview from './preview';

module.exports = (app) => {

    app.use('/', news);
    app.use('/', menu);
    app.use('/', preview);

    return (req, res, next) => {
        return next();
    };
};
