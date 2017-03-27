
import indexPage from './indexPage';
import category from './category';
import news from './news';
import menu from './menu';
import preview from './preview';
import pageview from './pageview';

module.exports = (app) => {

    app.use('/', indexPage);
    app.use('/', category);
    app.use('/', news);
    app.use('/', menu);
    app.use('/', preview);
    app.use('/', pageview);

    return (req, res, next) => {
        return next();
    };
};
