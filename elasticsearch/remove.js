import Debug from 'debug';
const debug = Debug('NOWnews-api:elasticsearch:remove');
import Promise from 'bluebird';
import client from './client';

module.exports = async (news) => {
    try {
        const result = await client.delete({
            index: 'nownews',
            type: 'news',
            routing: (new Date(news.formatCreatedAt)).getDay(),
            id: news.sn
        });
        return Promise.resolve(result);
    } catch (err) {
        // 不影響原本程式執行
        if (err.body.result !== 'not_found') {
            console.error('elasticsearch remove error =>', err.body);
        }
        return Promise.resolve();
    }
};