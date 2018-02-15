
import Debug from 'debug';
import moment from 'moment-timezone';
const debug = Debug('NOWnews-api:api-web:controllers:live:info');

module.exports = async (req, res, next) => {
    try {
        let now = moment.tz('Asia/Taipei');
        //NOW直播
        return res.json({
            title: '#NOW直播 2018央視春晚現場直播 20:00-00:30',
            teaserTitle: '#NOW直播 2018央視春晚現場直播 20:00-00:30',
            banner: 'https://img.nownews.com/photo/festival_640.jpg?' + now,
            alt: '#NOW直播 2018央視春晚現場直播 20:00-00:30',
            url: '',
            wowza: 'https://5a5ab4e1760b0.streamlock.net/live/c000.stream/playlist.m3u8?pf=mm',
            youtubeId: '',
            liveUrl: 'Livefestival',
            livePage: 'https://m.nownews.com/live/Livefestival',
            background: 'https://img.nownews.com/photo/live-background.jpg?' +  now,
            //backgroundColor: '#403534',
            backgroundColor: '#b40001',
            redirect: '',
            isOnAir: false,
            campainStatus: false,
            isOnAirforFungshui: false,
            campainStatusforFungshui: false
        });
    } catch(err) {
        return next(err);
    }
};