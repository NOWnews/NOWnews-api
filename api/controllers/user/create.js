
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:user:create');

import _ from 'lodash';

import { User } from '../../../models';

module.exports = async (req, res, next) => {
    try{

        let options = _.pick(req.body, [
            'name',
            'nickname',
            'staffId',
            'status',
            'Role',
            'email',
            'password',
            'phone',
            'Center',
            'Department',
            'jobTitle',
            'profileLink',
            'avatar'
        ]);

        // let newUser = await User.createAsync(options);

        debug('options = %j', options);

        return res.json(options);
    } catch (err) {
        return next(err);
    };
};