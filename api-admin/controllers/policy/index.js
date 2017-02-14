
import express from 'express';
let router = express.Router();

import group from './group';

router.route('/policies/group')
    .get(group);

module.exports = router;