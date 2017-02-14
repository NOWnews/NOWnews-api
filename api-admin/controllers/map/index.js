
import express from 'express';
let router = express.Router();

import location from './location';

router.route('/map/location')
    .get(location);

module.exports = router;
