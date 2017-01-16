
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:user:remove');

import { User } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;

    try{

        if (id === '530000000000000000000001') {
            throw new Error('10002');
        }

        let user = await User.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('user = %j', user);

        if(!user) {
            throw new Error('11011');
        }

        user.set('isTrashed', true);

        let removedUser = await user.saveAsync();

        return res.json(removedUser);
    } catch (err) {
        return next(err);
    };
};