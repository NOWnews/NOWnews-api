
import express from 'express';
let router = express.Router();

import { role as validatorRole } from '../../validators';

import create from './create';
import list from './list';
import one from './one';
import remove from './remove';
import update from './update';

router.route('/roles')
    .get(list)
    .post(validatorRole.create, create);

router.route('/roles/:id')
    .get(one)
    .delete(remove)
    .put(update);

module.exports = router;
