
import express from 'express';
let router = express.Router();

import struction from './struction';

router.route('/menu')
    .get(struction);

module.exports = router;