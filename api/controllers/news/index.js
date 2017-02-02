
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

router.route('/news')
    .get(baseQuery, list)
    .post(validators.news.create, create);

router.route('/news/:id')
    .get(one)
    .delete(remove)
    .put(update);

router.route('/news/:id/draft')
    .put(draft);

router.route('/news/:id/review')
    .put(review);

router.route('/news/:id/release')
    .put(release);

router.route('/news/:id/close')
    .put(close);

module.exports = router;