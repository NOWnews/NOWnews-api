
import express from 'express';
let router = express.Router();

import one from './one';

router.route('/news/:sn')
    .get(one);

module.exports = router;