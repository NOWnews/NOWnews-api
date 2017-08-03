import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:news:one');

import redis from '../../../redis';
import libs from '../../../libs';
import { News } from '../../../models';
import { Pageview } from '../../../pvModels'
import _ from 'lodash';
// TODO 為了世大運特別加的
import uuidv4 from 'uuid/v4';
import moment from 'moment-timezone';

module.exports = async (req, res, next) => {

    // TODO 為了世大運特別加的
    let summerUniversiade = (news) => {
        let isWin = false;
        let kindList = [];
        let kindProbability = (list, ballType, probability) => {
            let i = 0;
            while (i < probability) {
                list.push(ballType);
                i ++;
            }
            return list;
        };
        let isChannel = false;
        switch(moment.tz('Asia/Taipei').format('YYYYMMDD')) {
            case '20170814':
            case '20170815':
            case '20170816':
            case '20170817':
            case '20170818':
            case '20170819':
            case '20170820':
                // 機率為 80%
                isWin = _.random(1, 10) > 2 ? true : false;
                isChannel = ['運動', '生活', '娛樂'].indexOf(news.MainMenu.name) > -1;
                kindList = kindProbability(kindList, 'basketball', 50);
                kindList = kindProbability(kindList, 'baseball', 20);
                kindList = kindProbability(kindList, 'tennis', 20);
                break;
            case '20170821':
            case '20170822':
            case '20170823':
            case '20170824':
            case '20170825':
            case '20170826':
            case '20170827':
            case '20170828':
            case '20170829':
            case '20170830':
                // 機率為 80%
                isWin = _.random(1, 10) > 2 ? true : false;
                isChannel = ['運動', '政治', '社會'].indexOf(news.MainMenu.name) > -1;
                kindList = kindProbability(kindList, 'volleyball', 50);
                kindList = kindProbability(kindList, 'snooker', 50);
                break;
            case '20170831':
            case '20170901':
            case '20170902':
                // 機率為 90%
                isWin = _.random(1, 10) > 1 ? true : false;
                isChannel = true;
                kind = ['basketball', 'baseball', 'tennis', 'volleyball', 'snooker'];
                kindList = kindProbability(kindList, 'basketball', 20);
                kindList = kindProbability(kindList, 'baseball', 20);
                kindList = kindProbability(kindList, 'tennis', 30);
                kindList = kindProbability(kindList, 'volleyball', 15);
                kindList = kindProbability(kindList, 'snooker', 15);
                break;
        }
        if (isChannel && isWin) {
            let id = uuidv4();
            let createdAt = moment.tz('Asia/Taipei').format('YYYYMMDDHHmm');
            news.SummerUniversiade = {
                id,
                createdAt,
                kind: kindList[_.random(kindList.length - 1)]
            };
        }
        return news;
    }
    //--- TODO END

    try {

        let { sn } = req.params;


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
            // TODO 為了世大運特別加的
            cacheNews = summerUniversiade(cacheNews);

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

        // TODO 為了世大運特別加的
        news = summerUniversiade(news);

        //加上pageview的totalscore
        let pageviewList = await Pageview.find()
            .where('newsId').in(news.id)
            .select('totalScore')
            .execAsync();
        for(let pv of pageviewList){
            news.pageView.totalScore += pv.totalScore;
        }
        // 將這篇新聞存入 redis
        let cacheData = await redis.setValue(`news${sn}`, news, 3600 * 6);
        debug('cacheData = %j', cacheData);

        return res.json(news);
    }catch(err) {
        return next(err);
    }
};