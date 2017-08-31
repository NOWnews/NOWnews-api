
import express from 'express';
let router = express.Router();

import update from './update';
import one from './one';

router.route('/moderator/:id')
    .get(one)
    .put(update);

module.exports = router;
