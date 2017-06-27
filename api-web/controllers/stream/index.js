
import express from 'express';
let router = express.Router();

import channels from './channels'; 

router.route('/stream/channels')
    .get(channels);

module.exports = router;