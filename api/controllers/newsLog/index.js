
import express from 'express';
let router = express.Router();

import list from './list';
import compare from './compare';

router.route('/newslog')
    .get(list);

router.route('/newslog/compare')
    .get(compare);

module.exports = router;