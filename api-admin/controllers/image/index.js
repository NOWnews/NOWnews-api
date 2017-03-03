
import express from 'express';
import multer from 'multer';

let router = express.Router();
let imageUpload = multer({ dest: 'uploads/' });

import baseQuery from '../../middlewares/baseQuery';

import list from './list';
import upload from './upload';
import clone from './clone';
import create from './create';
import one from './one';
import update from './update';
import remove from './remove';
import realRemove from './realRemove';

router.route('/images')
    .post(create)
    .get(baseQuery, list);

router.route('/images/upload')
    .post(imageUpload.single('image'), upload);

router.route('/images/clone')
    .post(clone);

router.route('/images/:id')
    .put(update)
    .get(one)
    .delete(remove);

router.route('/images/:id/realRemove')
    .delete(realRemove);

module.exports = router;
