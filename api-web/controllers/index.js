
import indexPage from './indexPage';
import category from './category';
import news from './news';
import menu from './menu';
import preview from './preview';
import pageview from './pageview';
import temperature from './temperature';
import hot from './hot';

module.exports = (app) => {

    app.use('/', indexPage);
    app.use('/', category);
    app.use('/', news);
    app.use('/', menu);
    app.use('/', preview);
    app.use('/', pageview);
    app.use('/', temperature);
    app.use('/', hot);

    return (req, res, next) => {
        return next();
    };
};
