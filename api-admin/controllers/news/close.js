
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:news:close');

import { News } from '../../../models';
import { newsLog, refreshIndexPage, getIndexPage } from '../../../libs';
import redis from '../../../redis';
import elasticsearch from '../../../elasticsearch';

module.exports = async (req, res, next) => {
    try {

        let { UpdatedBy } = req.body;
        let { id } = req.params;

        let news = await News.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('news = %j', news);

        if(!news) {
            throw new Error('16003');
        }

        // 取得原本上一則下一則新聞的資料，並移除 cache
        let nextAndPrev = await redis.getValue(`news${news.sn}NextAndPrev`);

        if(nextAndPrev && nextAndPrev.next) {
            redis.removeValue(`news${nextAndPrev.next.sn}NextAndPrev`);
        }

        if(nextAndPrev && nextAndPrev.prev) {
            redis.removeValue(`news${nextAndPrev.prev.sn}NextAndPrev`);
        }

        // 檢查 redis 是否有資料，將之下架
        await Promise.all([
            redis.removeValue(`news${news.sn}`),
            redis.removeValue(`relationNewsByNews${news.sn}`),
            redis.removeValue(`news${news.sn}NextAndPrev`)
        ]);

        news.set('status', 'CLOSE');
        news.set('UpdatedBy', UpdatedBy);

        let updatedNews = await news.saveAsync();
        debug('update news = %j', updatedNews);

        // 處理首頁
        await refreshIndexPage();
        let cacheData = await getIndexPage();
        await redis.setValue('indexPage', cacheData);

        // 處理 log
        updatedNews = await updatedNews.populate('MainMenu Menus MainPhoto MainVideo Photos Videos Author Tags LastReviewer CreatedBy UpdatedBy').execPopulate();
        await newsLog(updatedNews, 'UPDATE');
        await elasticsearch.remove(updatedNews);
        return res.json(updatedNews);
    }catch(err) {
        return next(err);
    }
};