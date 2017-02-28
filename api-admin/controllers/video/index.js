
import express from 'express';
import multer from 'multer';

let router = express.Router();
let imageUpload = multer({ dest: 'uploads/' });

import upload from './upload';

router.route('/videos/upload')
    .post(imageUpload.single('video'), upload);

module.exports = router;
