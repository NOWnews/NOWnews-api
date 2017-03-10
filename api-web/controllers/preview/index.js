
import express from 'express';
let router = express.Router();

import one from './one';

router.route('/previews/:redisKey')
    .get(one);

module.exports = router;