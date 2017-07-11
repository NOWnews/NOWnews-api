
import express from 'express';
let router = express.Router();

import version from './version';
import splash from './splash';
import info from './info';
import nativeAd from './nativeAd';
import nativeAdCallback from './nativeAdCallback';

router.route('/app/version')
    .get(version);

router.route('/app/splash')
    .get(splash);

router.route('/app/info')
    .post(info);

router.route('/app/nativead')
    .get(nativeAd);

router.route('/app/nativead/callback')
    .get(nativeAdCallback);

module.exports = router;