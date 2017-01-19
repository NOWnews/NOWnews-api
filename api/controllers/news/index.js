
import express from 'express';
let router = express.Router();

import validators from '../../validators';
import baseQuery from '../../middlewares/baseQuery';

import create from './create';
import list from './list';
import one from './one';
import remove from './remove';

router.route('/news')
    .get(baseQuery, list)
    .post(validators.news.create, create);


router.route('/news/:id')
    .get(one)
    .delete(remove);

module.exports = router;