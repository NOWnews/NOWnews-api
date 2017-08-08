
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:create');

import Promise from 'bluebird';
import _ from 'lodash';

import fs from 'fs';

import redis from '../../../redis';
import { Menu } from '../../../models';

module.exports = async (req, res, next) => {

    try {
        let jsongroupdata
        let data = fs.readFileSync('files/groupfile.json', 'utf8');
        //避免一開始沒有頻道類別群組json格式會報錯誤
        if (data === ""){
            return res.send(null);
        }else {
            jsongroupdata = JSON.parse(data);
        }
        // let cacheData = await redis.setValue(`channel`, options);
        // debug('cacheData = %j', cacheData);
        // return res.send(200);
        return res.json(jsongroupdata);
    } catch (err) {
        return next(err);
    }
};
