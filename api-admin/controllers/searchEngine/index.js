
import express from 'express';
let router = express.Router();

import newest from './newest';

router.route('/searchengine/newest')
    .get(newest);

module.exports = router;