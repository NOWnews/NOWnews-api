
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:user:login');

import publicIp from 'public-ip';
import Promise from 'bluebird';

import { User, LoginTrack } from '../../../models';
import { hashPwd } from '../../../libs'

module.exports = async (req, res, next) => {

    let { email, password } = req.body;

    try {

        let user = await User.findOne()
            .where('email').equals(email)
            .where('password').equals(hashPwd(password))
            .where('isTrashed').equals(false)
            .where('status').nin(['SUSPENDED','LEAVING'])
            .populate('Avatar Role Department Center CreatedBy UpdatedBy')
            .deepPopulate('Role.Policies')
            .select('-password')
            .execAsync();

        if(!user) {
            throw new Error('11014');
        }

        let ip = await publicIp.v4()
            .then((ip) => {
                return Promise.resolve(ip);
            });

        let now = Date.now();

        user.set('lastLogin', now);

        await Promise.all([
            user.saveAsync(),
            LoginTrack.createAsync({
                User: user._id,
                action: 'LOGIN',
                createdAt: now,
                ip
            })
        ]);

        return res.json(user);
    } catch (err) {
        return next(err);
    }
};
