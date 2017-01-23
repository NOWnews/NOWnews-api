import home from './home';
import user from './user';
import policy from './policy';
import role from './role';
import center from './center';
import department from './department';
import image from './image';
import news from './news';
import newsMemo from './newsMemo';
import map from './map';

module.exports = (app) => {

    app.use('/', home);
    app.use('/', user);
    app.use('/', policy);
    app.use('/', role);
    app.use('/', center);
    app.use('/', image);
    app.use('/', department);
    app.use('/', news);
    app.use('/', newsMemo);
    app.use('/', map);

    return (req, res, next) => {
        return next();
    };
};
