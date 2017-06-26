
import express from 'express';
let router = express.Router();

import version from './version';
import splash from './splash';
import info from './info';

router.route('/app/version')
    .get(version);

router.route('/app/splash')
    .get(splash);

router.route('/app/info')
    .post(info);

module.exports = router;