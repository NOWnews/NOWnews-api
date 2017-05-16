
import indexPage from './indexPage';
import category from './category';
import news from './news';
import menu from './menu';
import preview from './preview';
import pageview from './pageview';
import temperature from './temperature';
import hot from './hot';
import search from './search';
import location from './location';
import instant from './instant';
import specialTopic from './specialTopic';
import specialChannel from './specialChannel';

module.exports = (app) => {

    app.use('/', indexPage);
    app.use('/', category);
    app.use('/', news);
    app.use('/', menu);
    app.use('/', preview);
    app.use('/', pageview);
    app.use('/', temperature);
    app.use('/', hot);
    app.use('/', search);
    app.use('/', location);
    app.use('/', instant);
    app.use('/', specialTopic);
    app.use('/', specialChannel);

    return (req, res, next) => {
        return next();
    };
};
