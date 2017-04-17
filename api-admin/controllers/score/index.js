
import express from 'express';
let router = express.Router();

import list from './list';

router.route('/scores')
    .get(list);

module.exports = router;
