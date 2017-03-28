
import express from 'express';
let router = express.Router();

import departments from './departments';
import users from './users';
import user from './user';

router.route('/statistics/departments')
    .get(departments);

router.route('/statistics/users')
    .get(users);

router.route('/statistics/users/:id')
    .get(user);

module.exports = router;
