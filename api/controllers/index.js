import home from './home';
import user from './user';
import policy from './policy';
import role from './role';

module.exports = (app) => {

    app.use('/', home);
    app.use('/', user);
    app.use('/', policy);
    app.use('/', role);

    return (req, res, next) => {
        return next();
    };
};
