
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:ott:provider.create');

import Promise from 'bluebird';
import _ from 'lodash';

import redis from '../../../redis';
import { Provider } from '../../../ottModels';

module.exports = async (req, res, next) => {

    try {

        let {
            platform,
            watchTime,
            lockTime,
            watchable,
            icon,
            titleMessage,
            downloadable,
            iosDownloadLink,
            androidDownloadLink,
            videoAD,
            CreatedBy
        } = req.body;
        debug('req.body = %j', req.body);

        let provider = await Provider.findOne()
            .where('platform').equals(platform)
            .where('isTrashed').equals('false')
            .execAsync();

        if(provider) {
            throw new Error('');
        }

        let newProvider = await Provider.createAsync({
            platform,
            watchTime,
            lockTime,
            watchable,
            icon,
            titleMessage,
            downloadable,
            iosDownloadLink,
            androidDownloadLink,
            videoAD,
            CreatedBy,
            UpdatedBy: CreatedBy
        });
        debug('new provider = %j', newProvider);


        // let options = _.pick(req.body, [
        //     'groupname',
        //     'typegroupname',
        //     'level',
        //     'weight',
        //     'ParentId',
        //     'child',
        //     'CreatedBy'
        // ]);
        // options.UpdatedBy = options.CreatedBy;
        // options.id = uuidv4();
        // debug('options = %j', options);
        // let obj = []
        // var data = fs.readFileSync('files/groupfile.json', 'utf8');
        // if (data.length == 0) {
        //     console.log("資料為零筆");
        //     obj.push(options); //add some data
        //     let jsonalldata = JSON.stringify(obj); //convert it back to json
        //     fs.writeFile('files/groupfile.json', jsonalldata, 'utf8', function(err) {
        //         if(err) {
        //             return console.log(err);
        //         }
        //         console.log("The file was saved!");
        //     });
        // }else{
        //     console.log("有資料");
        //     let jsonolddata = JSON.parse(data); //now it an object
        //     console.log(jsonolddata,"L47");
        //     for (var i=0; i<jsonolddata.length ; i++){
        //         console.log(jsonolddata[i].groupname,"L47");
        //         if (options.groupname == jsonolddata[i].groupname || options.typegroupname == jsonolddata[i].typegroupname) {
        //             console.log("他馬的重複了")
        //             return res.send('頻道類別重覆囉');
        //         }
        //         obj.push(jsonolddata[i]);
        //     }

        //     obj.push(options); //add some data
        //     let jsonalldata = JSON.stringify(obj); //convert it back to json

        //     fs.writeFile('files/groupfile.json', jsonalldata, 'utf8', function(err) {
        //         if(err) {
        //             return console.log(err);
        //         }
        //         console.log("The file was saved!");
        //     });
        // }
        // fs.readFile('files/groupfile.json', 'utf8', function readFileCallback(err, data){
        //     if (err){
        //         console.log(err);
        //     } else {
        //     console.log(data.length,"34");
        //     if (data.length == 0) {
        //         console.log("資料為零筆");
        //         obj.push(options); //add some data
        //         let jsonalldata = JSON.stringify(obj); //convert it back to json
        //         fs.writeFile('files/groupfile.json', jsonalldata, 'utf8', function(err) {
        //             if(err) {
        //                 return console.log(err);
        //             }
        //             console.log("The file was saved!");
        //         });
        //     }else{
        //         console.log("有資料");
        //         let jsonolddata = JSON.parse(data); //now it an object
        //         console.log(jsonolddata,"L47");
        //         for (var i=0; i<jsonolddata.length ; i++){
        //             console.log(jsonolddata[i].groupname,"L47");
        //             if (options.groupname == jsonolddata[i].groupname) {
        //                 console.log("他馬的重複了")
        //                 return
        //             }
        //             obj.push(jsonolddata[i]);
        //         }

        //         obj.push(options); //add some data
        //         let jsonalldata = JSON.stringify(obj); //convert it back to json

        //         fs.writeFile('files/groupfile.json', jsonalldata, 'utf8', function(err) {
        //             if(err) {
        //                 return console.log(err);
        //             }
        //             console.log("The file was saved!");
        //         });
        //     }
        // }});


        // fs.writeFile("files/groupfile.json", JSON.stringify(options), 'utf8', function(err) {
        //     if(err) {
        //         return console.log(err);
        //     }

        //     console.log("The file was saved!");
        // });
        // // 確認 url 是否有重複
        // let [ getMenuByUrl, getMenuByCategoryName ] = await Promise.all([
        //     Menu.findOne()
        //         .where('url').equals(options.url)
        //         .where('isTrashed').equals(false)
        //         .execAsync(),
        //     Menu.findOne()
        //         .and([
        //             { categoryName: options.categoryName },
        //             { categoryName: { $ne: null } }
        //         ])
        //         .where('isTrashed').equals(false)
        //         .execAsync(),
        // ]);

        // if(getMenuByUrl) {
        //     throw new Error('19005');
        // }

        // if(getMenuByCategoryName) {
        //     throw new Error('19007');
        // }

        // let newMenu = await Menu.createAsync(options);
        // debug('new menu = %j', newMenu);

        // // 將前台要用的 Menu 存在 redis
        // let webMenu = await Menu.findWebStructionAsync();
        // let cacheData = await redis.setValue(`channel`, options);
        // debug('cacheData = %j', cacheData);
        return res.status(200).json(newProvider);
        // return res.json(newMenu);
    } catch (err) {
        return next(err);
    }
};
