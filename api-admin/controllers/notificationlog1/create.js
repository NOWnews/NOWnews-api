import Debug from 'debug';
import { NotificationLog } from '../../../models';
const debug = Debug('NOWnews-api:api-admin:controllers:notificationLog:create');

module.exports = async (req, res, next) => {

    try {
        const data = req.body;

        const result = await NotificationLog.createAsync(data);

        return res.status(200).send();

    } catch(err) {
        return next(err);
    }
};
