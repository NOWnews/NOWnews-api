
import express from 'express';
let router = express.Router();

import baseQuery from '../../middlewares/baseQuery';

import list from './list';
import one from './one';

router.route('/specialchannels')
    .get(baseQuery, list);

router.route('/specialchannels/:sn')
    .get(one);

module.exports = router;
