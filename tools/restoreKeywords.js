/*
 * 將關鍵字匯入新聞
 * 啟動方式: NODE_ENV=${NODE_ENV} node bin/reportKeywords.js ${filename}
 * filename: file in files folder
 */

import Promise from 'bluebird';
import _ from 'lodash';
import excelToJson from 'convert-excel-to-json';

import { Tag, News } from '../models';

let regexString = /\/n\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/([0-9]+)/;

const getNewsSn = (url) => {
    let match = url.match(regexString);
    if(match === null || match.length <= 0) {
        return null;
    }
    return match[4];
};

const tagNames = ['復華投信','復華金管家','定時定額','復合投資法','理財','基金投資'];

module.exports = async () => {

    const filename = process.argv[2];

    if(!filename) {
        console.log('Error: please enter filename');
        return process.exit();
    }

    let result = excelToJson({
        sourceFile: `files/${filename}`
    });

    let sheetName = Object.keys(result)[0];

    let data = result[sheetName];

    let newsSns = [];
     _.forEach(data, (item) => {
        let url = item.B;
        let sn = getNewsSn(url);
        if(sn !== null) {
            newsSns.push(sn);
        }
    });

    let tagIds = await Promise.map(tagNames, (tagName) => {
        return Tag.findOne()
            .where('name').equals(tagName)
            .where('isTrashed').equals(false)
            .execAsync()
            .then((tagData) => {
                if(tagData) {
                    console.log('alive tag');
                    return Promise.resolve(tagData._id);
                }

                return Tag.createAsync({
                        name: tagName,
                        CreatedBy: '530000000000000000000001',
                        UpdatedBy: '530000000000000000000001'
                    })
                    .then((newTag) => {
                        console.log('new tag');
                        return Promise.resolve(newTag._id);
                    });
            });
    });
    console.log(tagIds);

    let newsList = await News.find()
        .where('sn').in(newsSns)
        .execAsync();

    let aliveTagsNews = [];
    let updatedNewsList = await Promise.map(newsList, (news) => {
        if(news.Tags.length != 0) {
            aliveTagsNews.push(news._id);
            return Promise.resolve(news);
        }

        news.set('Tags', tagIds);
        return news.saveAsync();
    });

    console.log(`文件上欲更新的新聞總數: ${newsSns.length}`);
    console.log(`實際上可更新的新聞總數: ${newsList.length}`);
    console.log(`已經存在 Tag 的新聞總數: ${aliveTagsNews.length}`);

    return process.exit();
};