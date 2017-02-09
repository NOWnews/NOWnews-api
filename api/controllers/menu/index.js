
import express from 'express';
let router = express.Router();

import validators from '../../validators';
import baseQuery from '../../middlewares/baseQuery';


import create from './create';
import list from './list';

router.route('/menus')
    .get(baseQuery, list)
    .post(validators.menu.create, create);

module.exports = router;
