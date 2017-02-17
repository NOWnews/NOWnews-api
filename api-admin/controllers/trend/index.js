
import express from 'express';
import multer from 'multer';

let router = express.Router();

import googleKeywords from './googleKeywords';

router.route('/trend/googleKeywords')
    .get(googleKeywords);

module.exports = router;
