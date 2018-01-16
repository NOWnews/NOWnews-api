import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:news:one');

import cheerio from 'cheerio';
import redis from '../../../redis';
import libs from '../../../libs';
import { News } from '../../../models';
import { Pageview } from '../../../pvModels'
import _ from 'lodash';
import config from 'config';

module.exports = async (req, res, next) => {

    try {

        let { sn } = req.params;

        if (!Number.isInteger(parseInt(sn, 10))) {
            throw new Error('16003');
        }

        let cacheNews = await redis.getValue(`news${sn}`);
        if(cacheNews) {
            cacheNews.pageView = { totalScore : 0 };
            //加上pageview的totalscore
            let pageviewList = await Pageview.find()
                .where('newsId').in(cacheNews.id)
                .select('totalScore')
                .execAsync();
            for(let pv of pageviewList){
                cacheNews.pageView.totalScore += pv.totalScore;
            };

            return res.json(cacheNews);
        }

        // 要給 api web 使用的 news 資料
        let news = await libs.getNewsBySn(sn);
        debug('news data = %j', news);

        if(!news) {
            throw new Error('16003');
        }

        news = news.toJSON();
        news.pageView = { totalScore: 0 };

        // 目前 IOS App 沒辦法吃 imgapi 的圖
        news.content = news.content.replace(/http(?:s?):\/\/(?:imgapiv2\.|web\.|m\.)?nownews\.com\/(?:.+src=)/g, '');

        //加上pageview的totalscore
        let pageviewList = await Pageview.find()
            .where('newsId').in(news.id)
            .select('totalScore')
            .execAsync();
        for(let pv of pageviewList){
            news.pageView.totalScore += pv.totalScore;
        }

        // 預設加入圖片跟圖說的 class，方便跟內文做區別
        news.content = news.content.replace('<p><img', '<p class="imgdesc"><img');

        // 預設加入圖片跟圖說的 class，方便跟內文做區別
        const $ = cheerio.load(news.content, { decodeEntities: false });
        $('img').parent('p').addClass('imgdesc');
        news.content = $.html();

        // 為了符合 App 格式，修改圖說的結構
        news.content = news.content.replace(/(<img.*?><\/p>)/mg, (item) => {
            return item.replace('</p>', '');
        }).replace('<p>\u25b2', '\u25b2');

        // 文中廣告，務必在最終版內文才做計算
        news.hasContentAd = news.template === 'DEFAULT';
        if (news.hasContentAd) {
            // 預計是兩百字，可是避免有其他 img、style css 等等，因此以 250 保險。
            // 4 = '</p>'.length
            let startIndex = 250;
            if (news.content.match(/^\<figure/)){
                startIndex = news.content.indexOf('</figure>') + '</figure>'.length;
            }
            const insertIndex = news.content.indexOf ('</p>', startIndex) + 4;
            news.contentAdIndex = insertIndex;
        }

        //給 app 使用的欄位 放入縮圖 api 的 url ， 因為中國要吃 imgapiv2 ， 台灣吃 imagelab
        news.resizeApiHost = config.get('general.imagelab.url');

        // 將這篇新聞存入 redis
        let cacheData = await redis.setValue(`news${sn}`, news, 3600 * 6);
        debug('cacheData = %j', cacheData);

        return res.json(news);
    }catch(err) {
        return next(err);
    }
};
