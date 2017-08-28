import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:news:remove');

import { News } from '../../../models';
import { newsLog } from '../../../libs';
import redis from '../../../redis';

module.exports = async (req, res, next) => {

    let { id } = req.params;

    try {

        let news = await News.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();

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

        news.set('isTrashed', true);

        let removedNews = await news.saveAsync();
        debug('removed news = %j', removedNews);

        // 處理 log
        removedNews = await removedNews.populate('MainMenu Menus MainPhoto MainVideo Photos Videos Author Tags LastReviewer CreatedBy UpdatedBy').execPopulate();
        await newsLog(removedNews, 'DELETE');

        return res.json(removedNews);
    }catch(err) {
        return next(err);
    }
};