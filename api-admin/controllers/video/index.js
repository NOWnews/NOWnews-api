
import express from 'express';
import multer from 'multer';

let router = express.Router();
let videoUpload = multer({ dest: 'uploads/' });

import validators from '../../validators';
import baseQuery from '../../middlewares/baseQuery';

import list from './list';
import upload from './upload';
import create from './create';
import one from './one';
import update from './update';
import remove from './remove';

router.route('/videos/')
    .get(baseQuery, list)
    .post(validators.video.create, create);

router.route('/videos/upload')
    .post(videoUpload.single('video'), validators.video.upload, upload);

router.route('/videos/:id')
    .get(one)
    .put(validators.video.update, update)
    .delete(validators.video.remove, remove);

module.exports = router;
