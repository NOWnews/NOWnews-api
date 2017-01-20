
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:user:login');

import { User } from '../../../models';
import { hashPwd } from '../../../libs'

module.exports = async (req, res, next) => {

    let { email, password } = req.body;

    try {

        let user = await User.findOne()
            .where('email').equals(email)
            .where('password').equals(hashPwd(password))
            .where('isTrashed').equals(false)
            .where('status').nin(['SUSPENDED','LEAVING'])
            .populate('Role Center Department CreatedBy UpdatedBy')
            .select('-password')
            .execAsync();

        if(!user) {
            throw new Error('11014');
        }

        return res.json(user);
    } catch (err) {
        return next(err);
    }
};