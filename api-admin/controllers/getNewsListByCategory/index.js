
import express from 'express';
let router = express.Router();

import baseQuery from '../../middlewares/baseQuery';

import list from './list';

router.route('/cat/:categoryId')
    .get(baseQuery, list);

// router.route('/cat/:categoryName/:type')
//     .get(baseQuery, list);

module.exports = router;
