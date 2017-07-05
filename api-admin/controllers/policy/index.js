
import express from 'express';
let router = express.Router();

import check from './check';
import group from './group';

router.route('/policies/group')
    .get(group);

router.route('/policies/check')
    .get(check);

module.exports = router;
