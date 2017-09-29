
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:recommend:newsKeywords');
import config from 'config';
import _ from 'lodash';

import Language from '@google-cloud/language';
const language = Language({
    projectId: config.get('general.googleCloud.projectId'),
    keyFilename: config.get('general.googleCloud.keyFilename')
});

// 從 google 自然語言分析取出所有關鍵字
const getKeyWords = (entities) => {
    let keywords = _.map(entities, (entity) => {
        return entity.name;
    });
    return keywords;
};

// 計算關鍵字的使用率
const keywordsUsageRate = (array) => {
    let result = [];
    let obj = {};
    array.forEach((item) => {
        if(!obj[item]) {
            obj[item] = { keyword: item, count: 1 };
            return
        }

        obj[item].count += 1;
    });
    return obj;
};

module.exports = async (req, res, next) => {
    try {

        let { content, title } = req.body;

        let [ contentAnalyze, titleAnalyze ] = await Promise.all([
            await language.analyzeEntities({
                document: {
                    'content': content,
                    type: 'PLAIN_TEXT'
                }
            }),
            await language.analyzeEntities({
                document: {
                    'content': title,
                    type: 'PLAIN_TEXT'
                }
            })
        ]);

        // 標題與內容的所有自然語言分析資料
        let contentKeywords = getKeyWords(contentAnalyze[0].entities);
        let titleKeywords = getKeyWords(titleAnalyze[0].entities);

        // 將兩個自然語言分析陣列 concat 在一起
        let concatedKeywords = _.concat(contentKeywords, titleKeywords);

        // 取出相同關鍵字並計算使用率
        let keywords = keywordsUsageRate(concatedKeywords);

        // 找出使用一次以上的關鍵字
        let filterKeywords = _.filter(keywords, (o) => {
            return o.count > 1 ;
        });

        // 依照使用率排序關鍵字
        let sortedKeywords = _.sortBy(filterKeywords, (o) => {
            return o.count;
        })
        .reverse();

        // 取出最多 7 筆的關鍵字
        let results = _.filter(sortedKeywords, (keyword, idx) => {
            return idx + 1 <= 7;
        });

        return res.json(results);
    }catch(err) {
        return next(err);
    }
};
