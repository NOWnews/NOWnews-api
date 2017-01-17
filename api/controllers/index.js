import home from './home';
import user from './user';
import policy from './policy';
import role from './role';
import center from './center';
import department from './department';
import image from './image';

module.exports = (app) => {

    app.use('/', home);
    app.use('/', user);
    app.use('/', policy);
    app.use('/', role);
    app.use('/', center);
    app.use('/', image);
    app.use('/', department);

    return (req, res, next) => {
        return next();
    };
};
