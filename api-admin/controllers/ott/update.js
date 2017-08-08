import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:update');

import fs from 'fs';

import _ from 'lodash';

module.exports = async (req, res, next) => {
    try {
        let { id } = req.params;

        // let {
        //     channelname, channellink, typegroupname, status, UpdatedBy
        // } = req.body;
        let options = _.pick(req.body, [
            'channelname',
            'channellink',
            'typegroupname',
            'status',
            'UpdatedBy'
        ]);
        console.log(options,"L22");
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
        let afterupdate = []
        _.forEach(jsonchanneldata, (channel, k) => {
            if ( id !== channel.id){
                afterupdate.push(channel);
            }else{
                channel.channelname = options.channelname;
                channel.channellink = options.channellink;
                channel.status = options.status;
                afterupdate.push(channel);

            }
        });

        let jsonallchanneldata = JSON.stringify(afterupdate); //convert it back to json

        fs.writeFile('files/channelfile.json', jsonallchanneldata, 'utf8', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(id,"經過更新");
            console.log("The file was saved!");
        });
        return res.json(afterupdate);

        // let [ menu, menuByUrl, menuByCategoryName ] = await Promise.all([
        //     Menu.findById(id)
        //         .where('isTrashed').equals(false)
        //         .execAsync(),
        //     Menu.findOne()
        //         .where('_id').ne(id)
        //         .where('url').equals(url)
        //         .where('isTrashed').equals(false)
        //         .execAsync(),
        //     Menu.findOne()
        //         .where('_id').ne(id)
        //         .and([
        //             { categoryName: categoryName },
        //             { categoryName: { $ne: null } }
        //         ])
        //         .where('isTrashed').equals(false)
        //         .execAsync(),
        // ]);

        // if(!menu) {
        //     throw new Error('19006');
        // }

        // if(menuByUrl) {
        //     throw new Error('19005');
        // }

        // if(menuByCategoryName) {
        //     throw new Error('19007');
        // }

        // if(name) {
        //     menu.set('name', name);
        // }

        // if(url) {
        //     menu.set('url', url);
        // }

        // if(status) {
        //     menu.set('status', status);
        // }

        // if(categoryName) {
        //     menu.set('categoryName', categoryName);
        // }

        // if(template) {
        //     menu.set('template', template);
        // }

        // if(templateAD) {
        //     menu.set('templateAD', templateAD);
        // }

        // isExternal = isExternal === true ? true : false;
        // isAdult = isAdult === true ? true : false;
        // menu.set('isExternal', isExternal);
        // menu.set('isAdult', isAdult);
        // menu.set('UpdatedBy', UpdatedBy);


        // let updatedMenu = await menu.saveAsync();

        // // 將前台要用的 Menu 存在 redis
        // let webMenu = await Menu.findWebStructionAsync();
        // let cacheData = await redis.setValue(`menu`, webMenu);
        // debug('cacheData = %j', cacheData);

        // if(updatedMenu.status === 'OPEN') {
        //     await Promise.all([
        //         updateCategoryFirstPage(updatedMenu.categoryName, 15, 0, 1), // Desktop Category First Page
        //         updateCategoryFirstPage(updatedMenu.categoryName, 30, 0, 1) // Mobile Category First Page
        //     ]);
        // }

        // return res.json(updatedMenu);
    } catch (err) {
        return next(err);
    }
};
