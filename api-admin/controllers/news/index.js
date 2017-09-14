
import express from 'express';
let router = express.Router();

import validators from '../../validators';
import baseQuery from '../../middlewares/baseQuery';

import create from './create';
import list from './list';
import one from './one';
import remove from './remove';
import update from './update';
import draft from './draft';
import review from './review';
import release from './release';
import close from './close';
import wasReleased from './wasreleased';

router.route('/news')
    .get(baseQuery, list)
    .post(validators.news.create, create);

router.route('/news/:id')
    .get(one)
    .delete(remove)
    .put(update);

router.route('/news/:id/draft')
    .put(validators.news.draft, draft);

router.route('/news/:id/review')
    .put(validators.news.review, review);

router.route('/news/:id/release')
    .put(validators.news.release, release);

router.route('/news/:id/close')
    .put(validators.news.close, close);

router.route('/news/:id/wasReleased')
    .get(wasReleased);

module.exports = router;