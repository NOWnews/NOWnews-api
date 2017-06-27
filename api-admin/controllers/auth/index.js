
import express from 'express';
let router = express.Router();

// import validators from '../../validators';
// import baseQuery from '../../middlewares/baseQuery';

// import create from './create';
// import list from './list';
// import one from './one';
// import remove from './remove';
// import createComment from './createComment';
// import removeComment from './removeComment';
import pathAuth from './path';

router.route('/auth')
    .get(pathAuth);

module.exports = router;
