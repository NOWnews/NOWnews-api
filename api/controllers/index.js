import home from './home';
import user from './user';
import policy from './policy';
import role from './role';
import center from './center';
import department from './department';

module.exports = (app) => {

    app.use('/', home);
    app.use('/', user);
    app.use('/', policy);
    app.use('/', role);
    app.use('/', center);
    app.use('/', department);

    return (req, res, next) => {
        return next();
    };
};
