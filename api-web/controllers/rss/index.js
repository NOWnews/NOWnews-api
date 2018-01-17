
import express from 'express';
let router = express.Router();
import list from './list';
import subList from './subList';

router.route('/rss')
    .get(list);

router.route('/subRss/:feedFrom')
    .get(subList);

module.exports = router;