
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:menu:sort');

import _ from 'lodash';
import Promise from 'bluebird';

import fs from 'fs';

import redis from '../../../redis';
import { Menu } from '../../../models';

module.exports = async (req, res, next) => {

    /*
     *
     * 前台傳入格式如下:
     * [{"id":"58a1292375420e4cc163c62d","children":[{"id":"58a1294475420e4cc163c630"}]},{"id":"58a1292e75420e4cc163c62e"},{"id":"58a1557275420e4cc163c631"},{"id":"58a166475fb84b131f06e37c"}]
     */

    try {
        let sortmenu = req.body.ottsort;
        console.log(sortmenu,"L22 拉出來的資料");
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


        // // 處理完後的資料
        let ottMenuData = [];
        let isMyDad = true, notMySon;
        // // 處理第一層的資料
        _.forEach(sortmenu, (mainMenu, i) => {
            ottMenuData.push({
                _id: mainMenu.id,
                weight: i,
                level: 0,
                hasChild: mainMenu.hasChild ? true : false,
                ParentId: null
            });

            // 如果第一層有 child，要處理第二層的資料
            if(mainMenu.children) {
                _.forEach(mainMenu.children, (child, k) => {
                    _.forEach(jsonchanneldata, (channel, k) => {
                        if ( child.id === channel.id.split('-')[4]) {
                            if (channel.ParentId.split('-')[4] !== mainMenu.id) {
                                // return res.send(channel);
                                isMyDad = false;
                                notMySon = channel;
                                console.log(child,"不等於外層的id")
                            }
                        }
                    });
                    console.log(child, "第二層的資料要做判斷")
                    ottMenuData.push({
                        _id: child.id,
                        weight: k,
                        level: 1,
                        hasChild: false,
                        ParentId: mainMenu.id
                    });
                });
            }
        });

        if (!isMyDad) {
            return res.send(notMySon);
        }

        console.log(ottMenuData,"L70處理過的資料")
        // // 處理第一層的排序
        let sortchannelgroupmenu = []
        _.map(ottMenuData,(data,i)=>{
            _.map(jsongroupdata,(cdata)=>{
                if (cdata.id.split('-')[4] === data._id){
                    cdata.weight = data.weight;
                    sortchannelgroupmenu.push(cdata);
                }
            });
        });
        console.log("準備寫爸爸檔案")
        let jsonallgroupdata = JSON.stringify(sortchannelgroupmenu); //convert it back to json

        fs.writeFile('files/groupfile.json', jsonallgroupdata, 'utf8', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("sort第一層排序 was saved!");
        });
        console.log("準備寫兒子檔案")


        // // 處理第二層的排序
        let sortchannelmenu = []

        _.map(ottMenuData,(data,i)=>{
            _.map(jsonchanneldata,(cdata)=>{
                if (cdata.id.split('-')[4] === data._id){
                    cdata.weight = data.weight;
                    sortchannelmenu.push(cdata);
                }
            });
        });

        let jsonallchanneldata = JSON.stringify(sortchannelmenu); //convert it back to json

        fs.writeFile('files/channelfile.json', jsonallchanneldata, 'utf8', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("第二層排序 was saved!");
        });




        res.send(200);
        // return res.json(updateAllMenus);
    }catch (err) {
        return next(err);
    }
};

// module.exports = async (req, res, next) => {

// [ { item_id: null, parent_id: null, depth: 0, left: 1, right: 14 },
//   { id: '2', parent_id: null, depth: 0, left: 2, right: 9 },
//   { id: '4', parent_id: '2', depth: 1, left: 3, right: 6 },
//   { id: '6', parent_id: '4', depth: 2, left: 4, right: 5 },
//   { id: '5', parent_id: '2', depth: 1, left: 7, right: 8 },
//   { id: '7', parent_id: null, depth: 0, left: 10, right: 11 },
//   { id: '3', parent_id: null, depth: 0, left: 12, right: 13 } ]

//     try {

//         // 因為前端套件問題，要先去除掉第一個 item
//         let menus = req.body.menus.splice(1, req.body.menus.length);

//         let updateAllMenus = await Promise.map(menus, (menu) => {
//             return Menu.findById(menu.id)
//                 .then((doc) => {

//                     doc.set('ParentId', menu.parent_id);
//                     doc.set('level', menu.depth);

//                     // 以目前來說，第二層不會有 child
//                     let hasChild = menu.depth > 0 ? false : false;
//                     doc.set('hasChild', hasChild);

//                     return doc.saveAsync();
//                 });
//         });

//         // 更新 parentId 的資料欄位
//         let updateParents = await Promise.map(menus, (menu) => {

//             if(!menu.parent_id) {
//                 return Menu.findById(menu.parent_id)
//                     .then((doc) => {
//                         doc.set('hasChild', false);
//                         return doc.saveAsync();
//                     });
//             }

//             return Menu.findById(menu.parent_id)
//                 .then((doc) => {
//                     doc.set('hasChild', true);
//                     return doc.saveAsync();
//                 });
//         });

//         return res.json(updateAllMenus);
//     } catch (err) {
//         return next(err);
//     }
// };
