
import express from 'express';
import create from './create';
import list from './list';

let router = express.Router();

router.route('/notificationLog')
    .get(list)
    .post(create);

module.exports = router;