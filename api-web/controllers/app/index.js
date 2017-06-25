
import express from 'express';
let router = express.Router();

import version from './version';
import splash from './splash';

router.route('/app/version')
    .get(version);

router.route('/app/splash')
    .get(splash);

module.exports = router;