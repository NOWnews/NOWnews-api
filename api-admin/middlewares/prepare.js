import { initFirebase } from '../../libs';

module.exports = () => {
    initFirebase();

    return (req, res, next) => {
        return next();
    };
};
