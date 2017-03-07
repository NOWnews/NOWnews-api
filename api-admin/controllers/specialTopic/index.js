
import express from 'express';
let router = express.Router();

import create from './create';
import list from './list';
import one from './one';
import update from './update';
import remove from './remove';

router.route('/specialtopics')
    .get(list)
    .post(create);

router.route('/specialtopics/:id')
    .get(one)
    .put(update)
    .delete(remove);

module.exports = router;
