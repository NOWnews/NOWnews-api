
import express from 'express';
let router = express.Router();

import validators from '../../validators';

import create from './create';

router.route('/users')
    .post(validators.user.create, create);

module.exports = router;
