
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:struction');

import Promise from 'bluebird';
import redis from '../../../redis';

import fs from 'fs';
import _ from 'lodash';


module.exports = async (req, res, next) => {
    try {

        let arr = {liveInfo:{},data:[]};

        let channellist = await redis.getValue(`channellist`);
        let liveinfo = await redis.getValue(`liveInfo`);
        arr.liveInfo = liveinfo;
        let channelgroupList = _.map(channellist,(data,i)=>{
            let groupobj = {};

            console.log(data,"L19 channellist")
            groupobj.categoryName = data.groupname;
            //如果有大於0筆在塞資料
            if (data.child.length > 0) {
                groupobj.count = data.child.length;
                groupobj.list = [];
                if (data.hasChild === true){
                    let channelobj = {};
                    _.map(data.child,(cdata)=>{
                        if (cdata.ParentId == data.id){
                            data.hasChild = true;
                            channelobj.SN = '';
                            channelobj.code = '';
                            channelobj.title = cdata.channelname;
                            channelobj.path = cdata.channellink;
                            groupobj.list.push(channelobj);
                        }
                    });
                }

                console.log(groupobj,"L35");
                arr.data.push(groupobj);
            }
        });

        return res.json(arr);
    } catch (err) {
        return next(err);
    }
};
