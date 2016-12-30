
import models from '../../../models';

module.exports = async(req, res, next) => {
    // 確認端點是否正常 work
    let foo = await models.Test.createAsync({
        name: ' SiMon    '
    });

    let bar = await models.Test.findOne()
        .sort('-_id')
        .execAsync();

    console.log(foo);
    console.log(bar);
    console.log(bar.id);
    console.log(bar._id);
    return res.send('<h1>Hello World!</h1>');
};