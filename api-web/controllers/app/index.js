
import express from 'express';
let router = express.Router();

import list from './list';

router.route('/app/version')
    .get(list);

module.exports = router;