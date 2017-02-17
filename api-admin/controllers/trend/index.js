
import express from 'express';

let router = express.Router();

import googleKeywords from './googleKeywords';

router.route('/trend/googleKeywords')
    .get(googleKeywords);

module.exports = router;
