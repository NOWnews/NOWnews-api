import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:libs:prepareImages');

import Promise from 'bluebird';
import axios from 'axios';

module.exports = async (news) => {
    try {

        // 先讓 img.nownews.com 有 cache
        await axios.get(news.MainPhoto.url);

        // 讓 imagelab 有 cache
        await Promise.all([
            axios.get(`https://imagelab.nownews.com/?w=1080&q=85&src=${news.MainPhoto.url}`),
            axios.get(`https://imagelab.nownews.com/?w=640&q=70&src=${news.MainPhoto.url}`),
            axios.get(`https://imagelab.nownews.com/?w=300&q=70&src=${news.MainPhoto.url}`),
            axios.get(`https://imagelab.nownews.com/?w=200&q=70&src=${news.MainPhoto.url}`)
        ]);
        return Promise.resolve({});
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};