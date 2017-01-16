
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:user:update');

import { User } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;
    let {
        name,
        nickname,
        staffId,
        status,
        Role,
        phone,
        Center,
        Department,
        jobTitle,
        profileLink,
        Avatar,
        UpdatedBy
    } = req.body;

    try{

        // if (id === '530000000000000000000001') {
        //     throw new Error('10002');
        // }

        let user = await User.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('user = %j', user);

        if(!user) {
            throw new Error('11011');
        }

        if(name) {
            user.set('name', name);
        }

        if(nickname) {
            user.set('nickname', nickname);
        }

        if(staffId) {
            user.set('staffId', staffId);
        }

        if(status) {
            user.set('status', status);
        }

        if(Role) {
            user.set('Role', Role);
        }

        if(phone) {
            user.set('phone', phone);
        }

        if(Center) {
            user.set('Center', Center);
        }

        if(Department) {
            user.set('Department', Department);
        }

        if(jobTitle) {
            user.set('jobTitle', jobTitle);
        }

        if(profileLink) {
            user.set('profileLink', profileLink);
        }

        if(Avatar) {
            user.set('Avatar', Avatar);
        }

        user.UpdatedBy = UpdatedBy;

        let updatedUser = await user.saveAsync();

        return res.json(updatedUser);
    } catch (err) {
        return next(err);
    };
};