
import express from 'express';
let router = express.Router();

import validators from '../../validators';

import create from './create';
import list from './list';

router.route('/roles')
    .get(list)
    .post(validators.role.create, create);

module.exports = router;
