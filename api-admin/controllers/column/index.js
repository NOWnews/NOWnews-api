
import express from 'express';
let router = express.Router();

import createSpecialChannel from './create.specialChannel';
import listSpecialChannel from './list.specialChannel';

router.route('/column/specialchannels')
    .get(listSpecialChannel)
    .post(createSpecialChannel);

module.exports = router;
