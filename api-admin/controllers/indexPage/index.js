
import express from 'express';
let router = express.Router();

import carousels from './carousels';
import specialTopics from './specialTopics';
import specialChannels from './specialChannels';
import videos from './videos';

router.route('/indexpage/carousels')
    .put(carousels);

router.route('/indexpage/specialtopics')
    .put(specialTopics);

router.route('/indexpage/specialchannels')
    .put(specialChannels);

router.route('/indexpage/videos')
    .put(videos);

module.exports = router;
