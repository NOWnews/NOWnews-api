
import express from 'express';
let router = express.Router();

import newsKeywords from './newsKeywords';

router.route('/recommend/newskeywords')
    .post(newsKeywords);

module.exports = router;
