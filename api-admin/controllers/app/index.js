
import express from 'express';
let router = express.Router();

import splashCreate from './splashCreate';
import splashOne from './splashOne';
import versionCreate from './versionCreate';
import versionList from './versionList';
import notificationAndroid from './notificationAndroid';
import notificationIOS from './notificationIOS';

router.route('/app/version')
    .post(versionCreate)
    .get(versionList);

router.route('/app/splash')
    .post(splashCreate)
    .get(splashOne);

router.route('/app/notification/ios')
    .post(notificationIOS);

router.route('/app/notification/android')
    .post(notificationAndroid);

module.exports = router;
