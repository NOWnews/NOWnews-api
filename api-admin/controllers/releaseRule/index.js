
import express from 'express';
let router = express.Router();

// import validators from '../../validators';
import baseQuery from '../../middlewares/baseQuery';

import create from './create';
import createTimeAndRole from './createTimeAndRole';

import list from './list';
// import one from './one';
// import remove from './remove';
// import createComment from './createComment';
import removeComment from './removeComment';
import update from './update';

router.route('/releaseRules')
    .post(create)
    .get(list)
    .put(update);
router.route('/releaseRules/timeAndRole')
    .post(createTimeAndRole);

// router.route('/dailyPlan/:id')
//     .get(one)
//     .put(update)
//     .delete(remove);

// router.route('/dailyPlan/:id/comment')
//     .post(createComment)
//     .delete(removeComment);

module.exports = router;
