
import express from 'express';
let router = express.Router();

import validators from '../../validators';

import create from './create';
import list from './list';
import remove from './remove';

router.route('/roles')
    .get(list)
    .post(validators.role.create, create);

router.route('/roles/:id')
    .delete(remove);

module.exports = router;
