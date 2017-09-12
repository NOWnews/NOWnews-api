
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:user:remove');

import { User } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;
    let { UpdatedBy } = req.body;

    try{

        let user = await User.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('user = %j', user);

        if(!user) {
            throw new Error('11011');
        }

        user.set('isTrashed', true);
        user.set('UpdatedBy', UpdatedBy);

        let removedUser = await user.saveAsync();

        return res.json(removedUser);
    } catch (err) {
        return next(err);
    };
};