
import express from 'express';
let router = express.Router();

import validators from '../../validators';
import baseQuery from '../../middlewares/baseQuery';


import create from './create';
import list from './list';
import one from './one';
import sort from './sort';

router.route('/menus')
    .get(baseQuery, list)
    .post(validators.menu.create, create);

router.route('/menus/sort')
    .put(sort);

router.route('/menus/:id')
    .get(one);

module.exports = router;
