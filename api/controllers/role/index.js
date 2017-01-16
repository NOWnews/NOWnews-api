
import express from 'express';
let router = express.Router();

import validators from '../../validators';

import create from './create';
import list from './list';
import one from './one';
import remove from './remove';
import update from './update';

router.route('/roles')
    .get(list)
    .post(validators.role.create, create);

router.route('/roles/:id')
    .get(one)
    .delete(remove)
    .put(validators.role.update, update);

module.exports = router;
