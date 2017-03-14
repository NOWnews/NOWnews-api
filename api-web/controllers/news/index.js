
import express from 'express';
let router = express.Router();

import one from './one';
import relations from './relations';

router.route('/news/:sn')
    .get(one);

router.route('/news/:sn/relations')
    .get(relations);

module.exports = router;