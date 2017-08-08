
import express from 'express';
let router = express.Router();

import validators from '../../validators';
import baseQuery from '../../middlewares/baseQuery';

import readgroupfile from './readgroupfile'
import readchannelfile from './readchannelfile'

import infocreate from './info.create';
import info from './info';
import channelcreate from './channel.create';
import channelgroupcreate from './channelgroup.create';
// import list from './list';
import one from './one';
import update from './update';
import remove from './remove';
import sort from './sort';
import struction from './struction';
import channellist from './channel.list';

router.route('/ott/info')
    .get(baseQuery)
    .get(info)
    .put(infocreate);


router.route('/ott/channelcreate')
    .get(baseQuery)
    .post(channelcreate);

router.route('/ott/channelgroupcreate')
    .get(baseQuery)
    .post(channelgroupcreate);


router.route('/ott/files/group')
    .get(readgroupfile)

router.route('/ott/files/channel')
    .get(readchannelfile)

router.route('/ott/struction')
    .get(struction);

router.route('/ott/channellist')
    .get(channellist);
// router.route('/menus/struction')
//     .get(struction);

router.route('/ott/sort')
    .put(sort);

router.route('/ott/:id')
    .get(one)
    .put(update)
    .delete(remove);

module.exports = router;
