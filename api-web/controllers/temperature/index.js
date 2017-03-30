
import express from 'express';
let router = express.Router();

import update from './update';
import remove from './remove';

router.route('/temperatures')
    .put(update)
    .delete(remove);

module.exports = router;