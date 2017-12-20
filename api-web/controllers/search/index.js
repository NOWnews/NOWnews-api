
import express from 'express';
let router = express.Router();

import baseQuery from '../../middlewares/baseQuery';

import list from './list';
import elasticsearch from './elasticsearch';

router.route('/search/:keyword')
    .get(baseQuery, list);


router.route('/esearch/:keyword')
    .get(baseQuery, elasticsearch);

module.exports = router;