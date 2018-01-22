
import Debug from 'debug';
import moment from 'moment-timezone';
const debug = Debug('NOWnews-api:api-web:controllers:live:info');

module.exports = async (req, res, next) => {
    try {
        let now = moment.tz('Asia/Taipei');
        //NOW直播
        
        return res.json({
            title: '#NOW直播　常豐居士－夏唯綱教授 命理風水學現場直播',
            teaserTitle: '#NOW直播　常豐居士－夏唯綱教授 命理風水學現場直播',
            banner: 'http://legacy.nownews.com/NOWnews_static/live-banner.jpg?' + now,
            alt: '#NOW直播　常豐居士－夏唯綱教授 命理風水學現場直播',
            url: 'https://www.youtube.com/embed/rqESGX2vt3M',
            wowza: 'https://5a5ab4e1760b0.streamlock.net/live/c000.stream/playlist.m3u8?pf=mm',
            youtubeId: 'rqESGX2vt3M',
            liveUrl: 'Livefungshui',
            livePage: 'https://m.nownews.com/live/rqESGX2vt3M',
            background: 'https://legacy.nownews.com/NOWnews_static/live-background.jpg?' +  now,
            backgroundColor: '#403534',
            redirect: '',
            isOnAir: false,
            campainStatus: false,
            isOnAirforFungshui: true,
            campainStatusforFungshui: true
        });
    } catch(err) {
        return next(err);
    }
};