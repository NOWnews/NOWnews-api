
import express from 'express';
let router = express.Router();

import list from './list';

router.route('/hot/:menuSn')
    .get(list);

module.exports = router;