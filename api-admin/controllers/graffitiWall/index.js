
import express from 'express';
let router = express.Router();

import validators from '../../validators';

import create from './create';
import list from './list';
import one from './one';
import remove from './remove';
import update from './update';

router.route('/graffitiWall')
    .post(validators.graffitiWall.create, create)
    .get(list);

router.route('/graffitiWall/:id')
    .get(one)
    .put(update)
    .delete(remove);


module.exports = router;
