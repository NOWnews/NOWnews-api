
import express from 'express';
let router = express.Router();

import create from './create';
import list from './list';
import one from './one';
import update from './update';
import remove from './remove';

router.route('/departments')
    .post(create)
    .get(list);

router.route('/departments/:id')
    .get(one)
    .put(update)
    .delete(remove);

module.exports = router;
