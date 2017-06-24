
import express from 'express';
let router = express.Router();

import versionCreate from './versionCreate';
import versionList from './versionList';

router.route('/app/version')
    .post(versionCreate)
    .get(versionList);

module.exports = router;
