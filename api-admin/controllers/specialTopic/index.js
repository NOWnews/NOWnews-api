
import express from 'express';
let router = express.Router();

import validators from '../../validators';
import baseQuery from '../../middlewares/baseQuery';

import create from './create';
import list from './list';
import one from './one';
import update from './update';
import remove from './remove';

router.route('/specialtopics')
    .get(baseQuery, list)
    .post(validators.specialTopic.create, create);

router.route('/specialtopics/:id')
    .get(one)
    .put(update)
    .delete(remove);

module.exports = router;
