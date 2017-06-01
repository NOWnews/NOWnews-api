
import express from 'express';
let router = express.Router();

import hot from './hot';

router.route('/tag/hot')
    .get(hot);

module.exports = router;