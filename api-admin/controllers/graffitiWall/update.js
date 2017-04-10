
import Debug from 'debug';
import _ from 'lodash';
const debug = Debug('NOWnews-api:api-admin:controllers:graffitiWall:list');

import { GraffitiWall } from '../../../models';

module.exports = async (req, res, next) => {

    let { News, sort } = req.query;

    try {

        let { id } = req.params;
        let { user, message, graffiti, UpdatedBy } = req.body;

        let menu = await GraffitiWall.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

        let updateGraffiti = menu.graffiti;

        let updateMessages = menu.messages;


        if (message && message !== ''){
            message = {
                user: user,
                message: message
            }
            updateMessages = _.concat(menu.messages, message);
        }

        if (graffiti && graffiti !== ''){
            updateGraffiti = graffiti;
        }

        menu.set('messages', updateMessages);
        menu.set('graffiti', updateGraffiti);
        menu.set('UpdatedBy', UpdatedBy);

        let updatedMenu = await menu.saveAsync();

        return res.json(updatedMenu);
    }catch(err) {
        return next(err);
    }
};
