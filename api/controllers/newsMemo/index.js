
import express from 'express';
let router = express.Router();

import validators from '../../validators';

import create from './create';
import list from './list';

router.route('/newsmemo/')
    .post(validators.newsMemo.create, create)
    .get(list);

module.exports = router;