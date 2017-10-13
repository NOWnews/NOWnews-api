import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:libs:prepareImages');

import Promise from 'bluebird';
import axios from 'axios';

module.exports = async (news) => {
    try {

        // 先讓 img.nownews.com 有 cache
        await axios.get(news.MainPhoto.url);
        //android尺寸 1440 1080 720 540 360
        //桌機尺寸 1080 300 200
        //手機尺寸 640 300
        // 讓 imagelab 有 cache
        await Promise.all([
            axios.get(`http://35.201.254.162:8877/?w=1440&q=70&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.254.162:8877/?w=1080&q=85&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.254.162:8877/?w=720&q=70&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.254.162:8877/?w=640&q=70&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.254.162:8877/?w=540&q=70&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.254.162:8877/?w=360&q=70&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.254.162:8877/?w=300&q=70&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.254.162:8877/?w=200&q=70&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.178.13:8877/?w=1440&q=70&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.178.13:8877/?w=1080&q=85&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.178.13:8877/?w=720&q=70&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.178.13:8877/?w=640&q=70&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.178.13:8877/?w=540&q=70&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.178.13:8877/?w=360&q=70&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.178.13:8877/?w=300&q=70&src=${news.MainPhoto.url}`),
            axios.get(`http://35.201.178.13:8877/?w=200&q=70&src=${news.MainPhoto.url}`)
        ]);
        return Promise.resolve({});
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};