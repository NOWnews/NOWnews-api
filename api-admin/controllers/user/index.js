
import express from 'express';
let router = express.Router();

import validators from '../../validators';
import baseQuery from '../../middlewares/baseQuery';

import create from './create';
import list from './list';
import one from './one';
import update from './update';
import remove from './remove';
import login from './login';
import logout from './logout';
import reviewers from './reviewers';

router.route('/users')
    .post(validators.user.create, create)
    .get(baseQuery, list);

router.route('/users/login')
    .post(validators.user.login, login);

router.route('/users/logout')
    .post(logout);

router.route('/users/:id')
    .get(one)
    .put(validators.user.update, update)
    .delete(remove);

router.route('/users/:id/reviewers')
    .get(reviewers);

module.exports = router;
