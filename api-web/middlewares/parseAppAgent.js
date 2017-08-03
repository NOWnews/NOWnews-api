
import config from 'config';
import { AppVersion } from '../../models';

let mode = config.get('admin.mode');
let keys = config.get('admin.header.X-NOWnews-API');

module.exports = async (req, res, next) => {
    try{

        let headerVersion = req.header('X-NOWnewsAPP-Version');
        let headerOS = req.header('X-NOWnewsAPP-OS');
        let headerMode = req.header('X-NOWnewsAPP-Mode');

        if(mode !== 'production') {
            return next();
        }

        if(headerMode !== 'production') {
            return next();
        }

        let lastVersion = await AppVersion.findOne()
            .where('os').equals(headerOS)
            .where('isTrashed').equals(false)
            .sort('-sn')
            .execAsync();

        if(!headerVersion || headerVersion !== lastVersion.version) {
            console.log(`correct app version = ${lastVersion.version}`);
            console.log(`user app version = ${headerVersion}`);
            throw new Error('10002');
        }

        return next();
    }
    catch(err) {
        return next(err);
    }
};