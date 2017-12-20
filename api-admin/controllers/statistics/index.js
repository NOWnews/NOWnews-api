
import express from 'express';
let router = express.Router();

import centers from './centers';
import users from './users';
import user from './user';
import categories from './categories';

router.route('/statistics/centers')
    .get(centers);

router.route('/statistics/centers/:id')
    .get(users);

router.route('/statistics/users/:id')
    .get(user);

router.route('/statistics/categories')
    .get(categories);

module.exports = router;
