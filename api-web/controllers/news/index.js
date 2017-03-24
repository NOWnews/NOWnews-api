
import express from 'express';
let router = express.Router();

import baseQuery from '../../middlewares/baseQuery';

import list from './list';
import one from './one';
import relations from './relations';
import nextAndPrev from './nextAndPrev';

router.route('/news')
    .get(baseQuery, list);

router.route('/news/:sn')
    .get(one);

router.route('/news/:sn/relations')
    .get(relations);

router.route('/news/:sn/nextandprev')
    .get(nextAndPrev);

module.exports = router;