
import express from 'express';
let router = express.Router();

import validators from '../../validators';
import baseQuery from '../../middlewares/baseQuery';

import create from './create';
import list from './list';
import one from './one';
import remove from './remove';

router.route('/tags')
    .get(baseQuery, list)
    .post(validators.tag.create, create);

router.route('/tags/:id')
    .get(one)
    .delete(remove);

module.exports = router;
