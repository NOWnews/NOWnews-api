
import express from 'express';
let router = express.Router();

import create from './create';
import createTimeAndRole from './createTimeAndRole';
import list from './list';

router.route('/releaseRules')
    .post(create)
    .get(list);
router.route('/releaseRules/timeAndRole')
    .post(createTimeAndRole);

module.exports = router;