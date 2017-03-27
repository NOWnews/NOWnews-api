
import express from 'express';
let router = express.Router();

import update from './update';

router.route('/pageviews')
    .put(update);

module.exports = router;