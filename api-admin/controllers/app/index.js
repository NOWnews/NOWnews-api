
import express from 'express';
let router = express.Router();

import splashCreate from './splashCreate';
import splashOne from './splashOne';
import versionCreate from './versionCreate';
import versionList from './versionList';

router.route('/app/version')
    .post(versionCreate)
    .get(versionList);

router.route('/app/splash')
    .post(splashCreate)
    .get(splashOne);

module.exports = router;
