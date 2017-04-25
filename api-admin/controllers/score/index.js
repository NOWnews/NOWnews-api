
import express from 'express';
let router = express.Router();

import list from './list';
import update from './update';

router.route('/scores')
    .get(list);

router.route('/scores/:newsId')
    .put(update);

module.exports = router;
