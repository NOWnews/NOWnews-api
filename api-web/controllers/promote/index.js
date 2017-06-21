import express from 'express';
let router = express.Router();

import common from './common';
import home from './home';
import news from './news';

router.route('/promote/common')
    .get(common);

router.route('/promote/home')
    .get(home);

router.route('/promote/news')
    .get(news);

module.exports = router;
