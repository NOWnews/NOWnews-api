
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:user:one');

import { User } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;

    try{

        let user = await User.findById(id)
            .where('isTrashed').equals(false)
            .populate('Role Center Department CreatedBy UpdatedBy')
            .select('-password')
            .execAsync();

        user = user.toObject({ virtuals: true });

        debug('user = %j', user);

        if(!user) {
            throw new Error('11011');
        }

        return res.json(user);
    } catch (err) {
        return next(err);
    };
};
