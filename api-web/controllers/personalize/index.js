
import express from 'express';
let router = express.Router();

import baseQuery from '../../middlewares/baseQuery';

import list from './list';

router.route('/personalize')
    .get(baseQuery, list);

module.exports = router;