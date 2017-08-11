
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:provider.one');

import { Provider } from '../../../ottModels';

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;

        let provider = await Provider.findById(id)
            .where('isTrashed').equals(false)
            .populate('data')
            .deepPopulate('data.channels')
            .execAsync();

        if(!provider) {
            throw new Error('');
        }

        return res.status(200).json(provider);

    } catch (err) {
        return next(err);
    }
};
