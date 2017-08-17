
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:provider.list');
import { Provider } from '../../../ottModels';

module.exports = async (req, res, next) => {

    try {
        let list = await Provider.find()
            .where('isTrashed').equals(false)
            .deepPopulate('data data.channels')
            .execAsync();
        return res.status(200).json(list);
    } catch (err) {
        return next(err);
    }
};
