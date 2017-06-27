
import express from 'express';
let router = express.Router();

import info from './info'; 

router.route('/live/info')
    .get(info);

module.exports = router;