
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:live:info');

module.exports = async (req, res, next) => {
    try {
        // 金曲
        return res.json({
            title: '第28屆金曲獎頒獎典禮紅毯 ！#NOW直擊 媒體採訪區',
            teaserTitle: '第28屆金曲獎頒獎典禮紅毯 ！#NOW直擊 媒體採訪區',
            banner: 'http://legacy.nownews.com/NOWnews_static/live-banner.jpg',
            alt: '第28屆金曲獎頒獎典禮紅毯 ！#NOW直擊 媒體採訪區',
            url: 'https://www.youtube.com/embed/rqESGX2vt3M',
            wowza: '',
            youtubeId: 'rqESGX2vt3M',
            livePage: 'https://m.nownews.com/live/rqESGX2vt3M',
            background: 'https://legacy.nownews.com/NOWnews_static/live-background.jpg',
            backgroundColor: '#403534',
            redirect: '',
            isOnAir: false,
            campainStatus: false
        });
    } catch(err) {
        return next(err);
    }
};