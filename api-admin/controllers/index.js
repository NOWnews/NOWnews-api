import home from './home';
import user from './user';
import policy from './policy';
import role from './role';
import center from './center';
import department from './department';
import image from './image';
import video from './video';
import news from './news';
import newsMemo from './newsMemo';
import newsLog from './newsLog';
import map from './map';
import tag from './tag';
import menu from './menu';
import trend from './trend';
import specialTopic from './specialTopic';
import specialChannel from './specialChannel';
import statistics from './statistics';
import indexPage from './indexPage';
import preview from './preview';
import postBoard from './postBoard';
import score from './score';
import rss from './rss';

module.exports = (app) => {

    app.use('/', home);
    app.use('/', user);
    app.use('/', policy);
    app.use('/', role);
    app.use('/', center);
    app.use('/', image);
    app.use('/', video);
    app.use('/', department);
    app.use('/', news);
    app.use('/', newsMemo);
    app.use('/', newsLog);
    app.use('/', map);
    app.use('/', tag);
    app.use('/', menu);
    app.use('/', trend);
    app.use('/', specialTopic);
    app.use('/', specialChannel);
    app.use('/', statistics);
    app.use('/', indexPage);
    app.use('/', preview);
    app.use('/', postBoard);
    app.use('/', score);
    app.use('/',rss)

    return (req, res, next) => {
        return next();
    };
};
