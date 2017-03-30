
import express from 'express';
let router = express.Router();

import list from './list';

router.route('/hot/:categoryName')
    .get(list);

module.exports = router;