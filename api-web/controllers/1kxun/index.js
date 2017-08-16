
import express from 'express';
let router = express.Router();

import entertainment from './entertainment';

router.route('/1kxun/entertainment')
    .get(entertainment);

module.exports = router;