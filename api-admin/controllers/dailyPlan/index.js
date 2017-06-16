
import express from 'express';
let router = express.Router();

import validators from '../../validators';
import baseQuery from '../../middlewares/baseQuery';

import create from './create';
import list from './list';
import one from './one';
import remove from './remove';
import createComment from './createComment';
import removeComment from './removeComment';
import update from './update';

router.route('/dailyPlan')
    .post(validators.dailyPlan.create, create)
    .get(baseQuery, list);

router.route('/dailyPlan/:id')
    .get(one)
    .put(update)
    .delete(remove);

router.route('/dailyPlan/:id/comment')
    .post(createComment)
    .delete(removeComment);

module.exports = router;
