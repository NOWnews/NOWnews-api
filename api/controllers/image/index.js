
import express from 'express';
import multer from 'multer';

let router = express.Router();
let imageUpload = multer({ dest: 'uploads/' });

import upload from './upload';
import one from './one';
import remove from './remove';
import realRemove from './realRemove';

router.route('/images/upload')
    .post(imageUpload.single('image'), upload);

router.route('/images/:id')
    .get(one)
    .delete(remove);

router.route('/images/:id/realRemove')
    .delete(realRemove);

module.exports = router;
