
import express from 'express';
let router = express.Router();

import validators from '../../validators';

import create from './create';

router.route('/roles')
    .post(validators.role.create, create);

module.exports = router;