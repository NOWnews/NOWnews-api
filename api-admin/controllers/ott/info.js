
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:create');

import Promise from 'bluebird';
import _ from 'lodash';


import redis from '../../../redis';
import { Menu } from '../../../models';

module.exports = async (req, res, next) => {

    try {
        let liveinfo = await redis.getValue(`liveInfo`);
        console.log(liveinfo,"L17123");
        // let options = _.pick(req.body, [
        //     'watchtime',
        //     'locktime',
        //     'watchable',
        //     'icon',
        //     'titleMessage'
        // ]);

        // options.UpdatedBy = options.CreatedBy;
        // options.downloadable = false;
        // options.iosDownloadLink = "";
        // options.androidDownloadLink = "";
        // options.videoAD = true;
        // console.log(options,"L16")


        // let cacheData = await redis.setValue(`liveInfo`, options);
        // debug('cacheData = %j', cacheData);



        return res.json(liveinfo);
    } catch (err) {
        return next(err);
    }
};
