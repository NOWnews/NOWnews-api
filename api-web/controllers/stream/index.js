
import express from 'express';
let router = express.Router();

import parseAppAgent from '../../middlewares/parseAppAgent';

import channels from './channels'; 

router.route('/stream/channels')
    .get(parseAppAgent, channels);

module.exports = router;