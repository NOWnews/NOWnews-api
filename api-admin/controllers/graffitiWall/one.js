
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:graffitiWall:list');

import { GraffitiWall } from '../../../models';

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;

        let cursor = GraffitiWall.findById(id)
            .where('isTrashed').equals(false);

        let memoList = await cursor
            // .deepPopulate('CreatedBy.Avatar')
            .execAsync();

        if(!memoList) {
            throw new Error('24003');
        }

        debug('news memo list = %j', memoList);

        return res.json(memoList);
    }catch(err) {
        return next(err);
    }
};
