
import express from 'express';
let router = express.Router();

import create from './create';

router.route('/previews')
    .post(create);

module.exports = router;
