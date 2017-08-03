
import config from 'config';
import { AppVersion } from '../../models';

let mode = config.get('admin.mode');
let keys = config.get('admin.header.X-NOWnews-API');

module.exports = async (req, res, next) => {
    try{

        let appVersion = req.header('X-NOWnewsAPP-Version');
        let appOS = req.header('X-NOWnewsAPP-OS');
        let appMode = req.header('X-NOWnewsAPP-Mode');

        if(mode !== 'production') {
            return next();
        }

        if(appMode !== 'production') {
            return next();
        }

        let lastVersion = await AppVersion.findOne()
            .where('os').equals(appOS)
            .where('isTrashed').equals(false)
            .sort('-sn')
            .execAsync();

        if(!appVersion || appVersion !== lastVersion.version) {
            console.log(`correct app version = ${lastVersion.version}`);
            console.log(`user app version = ${appVersion}`);
            throw new Error('10002');
        }

        return next();
    }
    catch(err) {
        return next(err);
    }
};