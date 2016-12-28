import home from './home';

module.exports = (app) => {

    app.use('/', home);

    return (req, res, next) => {
        return next();
    };
};
