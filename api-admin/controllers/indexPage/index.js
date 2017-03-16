
import express from 'express';
let router = express.Router();

import validators from '../../validators';

import list from './list';
import carousels from './carousels';
import specialTopics from './specialTopics';
import specialChannels from './specialChannels';
import videos from './videos';

router.route('/indexpage')
    .get(list);

router.route('/indexpage/carousels')
    .put(validators.indexpage.carousels, carousels);

router.route('/indexpage/specialtopics')
    .put(validators.indexpage.specialTopics, specialTopics);

router.route('/indexpage/specialchannels')
    .put(validators.indexpage.specialChannels, specialChannels);

router.route('/indexpage/videos')
    .put(validators.indexpage.videos, videos);

module.exports = router;
