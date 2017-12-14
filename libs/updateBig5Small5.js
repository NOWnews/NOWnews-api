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
        let carousels = [];

        let menu = await redis.getValue('menu');

        if (!menu) {
            menu = await Menu.findWebStructionAsync();
            await redis.setValue('menu', menu);
        }

        let celebritycommentMenu = await Menu.findOne()
            .where('name').equals('名家論壇')
            .where('isTrashed').equals(false)
            .select('_id');
        celebritycomment = celebritycommentMenu._id;

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
        let [politicData, financeData, entertainmentData, sportData, localData, celebritycommentData] = await Promise.all([
            News.find()
                .where('MainMenu').equals(politic)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .where('isFeed').equals(false)
                .where('isSponsored').equals(false)
                .select('_id')
                .where('_id').nin(manualPutNewsIds)
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
                .sort('-startedAt')
                .limit(2)
                .execAsync(),
            News.find()
                .where('Menus').equals(celebritycomment)
                .where('status').equals('RELEASE')
                .where('startedAt').lte(Date.now())
                .where('isFeed').equals(false)
                .where('isSponsored').equals(false)
                .select('_id')
                .where('_id').nin(manualPutNewsIds)
                .sort('-startedAt')
                .limit(1)
                .execAsync()
        ]);

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

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};
