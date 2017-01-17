
import express from 'express';
let router = express.Router();

import validators from '../../validators';
import baseQuery from '../../middlewares/baseQuery';

import create from './create';
import list from './list';
import one from './one';
import update from './update';
import remove from './remove';

router.route('/users')
    .post(validators.user.create, create)
    .get(baseQuery, list);

router.route('/users/:id')
    .get(one)
    .put(validators.user.update, update)
    .delete(remove);

module.exports = router;
