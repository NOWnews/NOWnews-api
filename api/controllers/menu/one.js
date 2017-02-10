
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:menu:one');

import { Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params.id;

        let menu = await Menu.findById(id)
            .where('isTrashed').equals(false)
            .populate('CreatedBy UpdatedBy')
            .execAsync();
        debug('menu = %j', menu);

        return res.json(menu);
    } catch (err) {
        return next(err);
    }
};