
import express from 'express';
let router = express.Router();

import providerCreate from './provider.create';
import providerList from './provider.list';
import providerOne from './provider.one';
import providerUpdate from './provider.update';
import categoryCreate from './category.create';
import categoryRemove from './category.remove';
import channelCreate from './channel.create';
import channelRemove from './channel.remove';
import weightUpdate from './weight.update';

router.route('/ott/providers')
    .get(providerList)
    .post(providerCreate);

router.route('/ott/providers/:id')
    .get(providerOne)
    .put(providerUpdate);

router.route('/ott/categories')
    .post(categoryCreate);

router.route('/ott/categories/:id')
    .delete(categoryRemove);

router.route('/ott/channels')
    .post(channelCreate);

router.route('/ott/channels/:id')
    .delete(channelRemove);

router.route('/ott/weight')
    .put(weightUpdate);

module.exports = router;
