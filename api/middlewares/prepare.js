
module.exports = () => {

    return (req, res, next) => {
        console.log(1234);
        return next();
    };
};