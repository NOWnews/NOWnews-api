
import express from 'express';
let router = express.Router();

import home from './home';

router.route('/')
    .get(home);

module.exports = router;
