
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:menu:one');


import fs from 'fs';
import _ from 'lodash';

import { Menu } from '../../../models';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;
        //讀取頻道資料
        let channeldata = fs.readFileSync('files/channelfile.json', 'utf8');
        let jsonchanneldata
        //避免一開始沒有頻道類別群組json格式會報錯誤
        if (channeldata === ""){
            return res.send(null);
        }else {
            jsonchanneldata = JSON.parse(channeldata);
        }
        //讀取頻道類別資料
        let channelgroupdata = fs.readFileSync('files/groupfile.json', 'utf8');
        let jsongroupdata
        //避免一開始沒有頻道類別群組json格式會報錯誤
        if (channelgroupdata === ""){
            return res.send(null);
        }else {
            jsongroupdata = JSON.parse(channelgroupdata);
        }

        let onepagedata = []
        _.forEach(jsonchanneldata, (channel, k) => {
            if ( id === channel.id){
                onepagedata.push(channel);
            }
        });
        return res.json(onepagedata[0]);

    } catch (err) {
        return next(err);
    }
};
