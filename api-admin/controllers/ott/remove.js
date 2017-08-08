import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:remove');

import fs from 'fs';

import _ from 'lodash';

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;
        console.log(id,"要刪掉的id")
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
        let afterdelete = []
        _.forEach(jsonchanneldata, (channel, k) => {
            console.log(channel.id,"要刪除的id資料庫資料")
            if ( id !== channel.id){
                afterdelete.push(channel);
            }
        });

        let jsonallchanneldata = JSON.stringify(afterdelete); //convert it back to json

        fs.writeFile('files/channelfile.json', jsonallchanneldata, 'utf8', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(id,"經過刪除");
            console.log("The file was saved!");
        });
        return res.send(200);
        // return res.json(removedMenu);
    } catch (err) {
        return next(err);
    }
};
