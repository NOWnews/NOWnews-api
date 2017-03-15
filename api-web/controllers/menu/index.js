
import express from 'express';
let router = express.Router();

import struction from './struction';

router.route('/menus')
    .get(struction);

module.exports = router;