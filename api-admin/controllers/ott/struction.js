
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:struction');

import Promise from 'bluebird';
import redis from '../../../redis';

import fs from 'fs';
import _ from 'lodash';


module.exports = async (req, res, next) => {
    try {
        let arr = [];

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
        let channelgroupList = _.map(jsongroupdata,(data,i)=>{
            _.map(jsonchanneldata,(cdata)=>{
                if (cdata.ParentId == data.id){
                    data.hasChild = true;
                    data.child.push(cdata);
                }
            });
            arr.push(data);
        });

        let cacheData = await redis.setValue(`channellist`, arr);
        debug('cacheData = %j', cacheData);
        return res.json(arr);
    } catch (err) {
        return next(err);
    }
};
