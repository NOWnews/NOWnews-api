/**
 * 2017.12.20 頭十 大五小五機制 簡述
 * 十筆新聞取各分類最新的新聞
 * 一政 二經 三體 四娛 五娛 六政 七政 八經 九體 十名家論壇
 * 名家論壇(次選單）只會放在第十個，上面九個不會出現名家論壇
 * 今日廣場(次選單）不會出現在頭十
 */
import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updateBig5Small5');

import _ from 'lodash';

import { News, IndexPage, Menu } from '../models';
import redis from '../redis';

module.exports = async () => {
    try {

        let politic = 0;
        let finance = 0;
        let entertainment = 0;
        let sport = 0;
        let local = 0;
        let celebritycomment = 0;
        let usertalk = 0;
        let carousels = [];

        let menu = await redis.getValue('menu');

        if (!menu) {
            menu = await Menu.findWebStructionAsync();
            await redis.setValue('menu', menu);
        }
        let [ celebritycommentMenu, usertalkMenu ] = await Promise.all([
            Menu.findOne()
            .where('name').equals('名家論壇')
            .where('isTrashed').equals(false)
            .select('_id'),
            Menu.findOne()
            .where('name').equals('今日廣場')
            .where('isTrashed').equals(false)
            .select('_id')
        ]);
        celebritycomment = celebritycommentMenu? celebritycommentMenu._id: null;
        usertalk = usertalkMenu? usertalkMenu._id: null;

        _.forEach(menu, (m) => {
            switch (m.name) {
                case '政治':
                    politic = m._id;
                    break;
                case '財經':
                    finance = m._id;
                    break;
                case '娛樂':
                    entertainment = m._id;
                    break;
                case '運動':
                    sport = m._id;
                    break;
                case '地方':
                    local = m._id;
                    break;
            }
        });

        //避免自動選取的新聞與手動調整的新聞重複
        let indexPage = await IndexPage.findOne();
        let manualPutNewsIds = indexPage.addCarousels;
        let [politicData, financeData, entertainmentData, sportData, localData] = await Promise.all([
            News.find()
                .where('MainMenu').equals(politic)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .where('isFeed').equals(false)
                .where('isSponsored').equals(false)
                .select('_id')
                .where('_id').nin(manualPutNewsIds)
                .where('Menus').nin([celebritycomment, usertalk])
                .sort('-startedAt')
                .limit(3)
                .execAsync(),
            News.find()
                .where('MainMenu').equals(finance)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .where('isFeed').equals(false)
                .where('isSponsored').equals(false)
                .select('_id')
                .where('_id').nin(manualPutNewsIds)
                .where('Menus').nin([celebritycomment, usertalk])
                .sort('-startedAt')
                .limit(2)
                .execAsync(),
            News.find()
                .where('MainMenu').equals(entertainment)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .where('isFeed').equals(false)
                .where('isSponsored').equals(false)
                .select('_id')
                .where('_id').nin(manualPutNewsIds)
                .where('Menus').nin([celebritycomment, usertalk])
                .sort('-startedAt')
                .limit(2)
                .execAsync(),
            News.find()
                .where('MainMenu').equals(sport)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .where('isFeed').equals(false)
                .where('isSponsored').equals(false)
                .select('_id')
                .where('_id').nin(manualPutNewsIds)
                .where('Menus').nin([celebritycomment, usertalk])
                .sort('-startedAt')
                .limit(2)
                .execAsync(),
            News.find()
                .where('MainMenu').equals(local)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .where('isFeed').equals(false)
                .where('isSponsored').equals(false)
                .select('_id')
                .where('_id').nin(manualPutNewsIds)
                .where('Menus').nin([celebritycomment, usertalk])
                .sort('-startedAt')
                .limit(2)
                .execAsync()
        ]);
        let allMainMenuNews = [...politicData, ...financeData, ...entertainmentData, ...sportData, ...localData] ;
        let allMainMenuNewsIds = [];
        _.forEach(allMainMenuNews, (news) => {
            allMainMenuNewsIds.push( news._id );
        });
        let celebritycommentData = await News.find()
            .where('Menus').equals(celebritycomment)
            .where('status').equals('RELEASE')
            .where('startedAt').lte(Date.now())
            .where('isFeed').equals(false)
            .where('isSponsored').equals(false)
            .select('_id')
            .where('_id').nin([...manualPutNewsIds, ...allMainMenuNewsIds])
            .sort('-startedAt')
            .limit(1)
            .execAsync();

        // 排序規則
        carousels[0] = politicData[0]._id
        carousels[1] = financeData[0]._id
        carousels[2] = sportData[0]._id
        carousels[3] = entertainmentData[0]._id
        carousels[4] = entertainmentData[1]._id
        carousels[5] = politicData[1]._id
        carousels[6] = politicData[2]._id
        carousels[7] = financeData[1]._id
        carousels[8] = sportData[1]._id
        carousels[9] = celebritycommentData[0]._id

        let indexpages = await IndexPage.findOne().execAsync();

        indexpages.set('carousels', carousels);

        await indexpages.saveAsync();

        // 更新後把舊的 cache 刪除
        redis.removeValue('indexPage');

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};
