import express from 'express';
let router = express.Router();

import common from './common';
import home from './home';
import news from './news';

router.route('/ad/common')
    .get(common);

router.route('/ad/home')
    .get(home);

router.route('/ad/news')
    .get(news);

module.exports = router;
