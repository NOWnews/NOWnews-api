
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:graffitiWall:list');

import { GraffitiWall } from '../../../models';

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;

        let cursor = GraffitiWall.findById(id)
            .where('isTrashed').equals(false);

        let menu = await cursor
            // .deepPopulate('CreatedBy.Avatar')
            .execAsync();

        if(!menu) {
            throw new Error('24003');
        }

        menu.set('isTrashed', true);

        let removedMenu = await menu.saveAsync();

        return res.json(removedMenu);
    }catch(err) {
        return next(err);
    }
};
