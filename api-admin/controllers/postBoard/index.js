
import express from 'express';
let router = express.Router();

import validators from '../../validators';

import create from './create';
import list from './list';
import one from './one';
import remove from './remove';
import removeMessage from './removeMessage';
import update from './update';

router.route('/postBoard')
    .post(validators.postBoard.create, create)
    .get(list);

router.route('/postBoard/:id')
    .get(one)
    .put(update)
    .delete(remove);

router.route('/postBoard/:id/message')
    .delete(removeMessage);

module.exports = router;
