
import express from 'express';
import multer from 'multer';

let router = express.Router();
let videoUpload = multer({ dest: 'uploads/' });

import upload from './upload';
import create from './create';

router.route('/videos/')
    .post(create);

router.route('/videos/upload')
    .post(videoUpload.single('video'), upload);

module.exports = router;
