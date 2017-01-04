import home from './home';
import user from './user';

module.exports = (app) => {

    app.use('/', home);
    app.use('/', user);

    return (req, res, next) => {
        return next();
    };
};
