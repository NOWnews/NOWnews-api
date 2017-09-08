
import express from 'express';
let router = express.Router();

import createSpecialChannel from './create.specialChannel';
import listSpecialChannel from './list.specialChannel';
import oneSpecialChannel from './one.specialChannel';
import updateSpecialChannel from './update.specialChannel';
import removeSpecialChannel from './remove.specialChannel';

router.route('/column/specialchannels')
    .get(listSpecialChannel)
    .post(createSpecialChannel);

router.route('/column/specialchannels/:id')
    .get(oneSpecialChannel)
    .put(updateSpecialChannel)
    .delete(removeSpecialChannel);

module.exports = router;
