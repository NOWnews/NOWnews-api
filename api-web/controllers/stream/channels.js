
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:tv:channels');

import { Address6 } from 'ip-address';
import axios from 'axios';

module.exports = async (req, res, next) => {
    try {

        /*
         * 處理 ip，那個 'x-real-ip' 不知道是哪個該死的設定在 nginx 裡面取代 remote address
         */
        let ipString = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let isIPV6 = new Address6(ipString);
        if(isIPV6.isValid()) {
            ipString = isIPV6.to4().address;
        }
        debug('ip string = %s', ipString);

        // 拿 ip 去跟防盜連做註冊
        let { data: registerData } = await axios.get(`http://61.67.121.80:10011/api/wowza/register?ip=${ipString}`);
        debug('registerData = %s', registerData);

        // 綜合娛樂
        let entertainments = [
            // {
            //     SN: '',
            //     code: '',
            //     title: '民視',
            //     path: `http://59.124.93.43:1935/live/nns153.stream/playlist.m3u8?johncena=${registerData.johncena}`
            // },
            {
                SN: '',
                code: '',
                title: '台視',
                path: `http://59.124.93.43:1935/live/nns201.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '中視',
                path: `http://59.124.93.43:1935/live/nns202.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '華視',
                path: `http://59.124.93.43:1935/live/nns203.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '緯來綜合台',
                path: `http://59.124.93.43:1935/live/nns213.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '公視2',
                path: `http://59.124.93.43:1935/live/nns136.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '公視3',
                path: `http://59.124.93.43:1935/live/nns137.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '靖天育樂台',
                path: `http://59.124.93.43:1935/live/nns139.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: 'KLT-靖天國際台',
                path: `http://59.124.93.43:1935/live/nns144.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '靖天綜合台',
                path: `http://59.124.93.43:1935/live/nns142.stream/playlist.m3u8?johncena=${registerData.johncena}`
            }
        ];

        // 兒少動漫
        let animes = [
            {
                SN: '',
                code: '',
                title: '卡通頻道',
                path: `http://59.124.93.43:1935/live/nns209.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '迪士尼頻道',
                path: `http://59.124.93.43:1935/live/nns210.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: 'MOMO親子台',
                path: `http://59.124.93.43:1935/live/nns211.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '靖天卡通台',
                path: `http://59.124.93.43:1935/live/nns138.stream/playlist.m3u8?johncena=${registerData.johncena}`
            }
        ];

        // 新聞資訊
        let news = [
            // {
            //     SN: '',
            //     code: '',
            //     title: '民視新聞台',
            //     path: `http://59.124.93.43:1935/live/nns199.stream/playlist.m3u8?johncena=${registerData.johncena}`
            // },
            // {
            //     SN: '',
            //     code: '',
            //     title: '寰宇新聞二台',
            //     path: `http://59.124.93.43:1935/live/nns146.stream/playlist.m3u8?johncena=${registerData.johncena}`
            // },
            // {
            //     SN: '',
            //     code: '',
            //     title: '寰宇新聞台',
            //     path: `http://59.124.93.43:1935/live/nns147.stream/playlist.m3u8?johncena=${registerData.johncena}`
            // },
            // {
            //     SN: '',
            //     code: '',
            //     title: '寰宇財經台',
            //     path: `http://59.124.93.43:1935/live/nns148.stream/playlist.m3u8?johncena=${registerData.johncena}`
            // },
            {
                SN: '',
                code: '',
                title: '靖天資訊台',
                path: `http://59.124.93.43:1935/live/nns143.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: 'NICE TV',
                path: `http://59.124.93.43:1935/live/nns145.stream/playlist.m3u8?johncena=${registerData.johncena}`
            }
        ];

        // 戲劇電影
        let dramas = [
            {
                SN: '',
                code: '',
                title: '衛視電影台',
                path: `http://59.124.93.43:1935/live/nns173.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '衛視洋片台',
                path: `http://59.124.93.43:1935/live/nns179.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            // {
            //     SN: '',
            //     code: '',
            //     title: 'HBO',
            //     path: `http://59.124.93.43:1935/live/nns1226.stream/playlist.m3u8?johncena=${registerData.johncena}`
            // },
            {
                SN: '',
                code: '',
                title: '靖天戲劇台',
                path: `http://59.124.93.43:1935/live/nns140.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '靖天日本台',
                path: `http://59.124.93.43:1935/live/nns141.stream/playlist.m3u8?johncena=${registerData.johncena}`
            }
        ];

        // 專業體育
        let sports = [
            {
                SN: '',
                code: '',
                title: '緯來育樂台',
                path: `http://59.124.93.43:1935/live/nns206.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            // {
            //     SN: '',
            //     code: '',
            //     title: '緯來體育台',
            //     path: `http://59.124.93.43:1935/live/nns181.stream/playlist.m3u8?johncena=${registerData.johncena}`
            // },
            // {
            //     SN: '',
            //     code: '',
            //     title: '博斯足球台',
            //     path: `http://59.124.93.43:1935/live/nns149.stream/playlist.m3u8?johncena=${registerData.johncena}`
            // },
            // {
            //     SN: '',
            //     code: '',
            //     title: '博斯無線台',
            //     path: `http://59.124.93.43:1935/live/nns150.stream/playlist.m3u8?johncena=${registerData.johncena}`
            // },
            {
                SN: '',
                code: '',
                title: '愛爾達體育台',
                path: `http://59.124.93.43:1935/live/nns1217.stream/playlist.m3u8?johncena=${registerData.johncena}`
            }
        ];

        // 無線數位
        let wireless = [
            {
                SN: '',
                code: '',
                title: '公共電視',
                path: `http://59.124.93.43:1935/live/nns204.stream/playlist.m3u8?johncena=${registerData.johncena}`
            }
        ];

        // 衛星電視
        let satellite = [
            {
                SN: '',
                code: '',
                title: '北京國際台',
                path: `http://59.124.93.43:1935/live/gw112.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '湖南國際電視',
                path: `http://59.124.93.43:1935/live/gw117.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '上海東方衛視',
                path: `http://59.124.93.43:1935/live/gw113.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '深圳電視台',
                path: `http://59.124.93.43:1935/live/gw118.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
        ];

        return res.json({
            liveInfo: {
                watchTime: 20,
                lockTime: 30,
                watchable: true,
                icon: 'http://legacy.nownews.com/NOWnews_static/watchNOW-logo-v2.png',
                titleMessage: '本直播由 watchNOW APP 提供精彩試看\n請密切關注 watchNOW 的下載通知！\n\n本服務由華夏新媒體有限公司提供\n客服專線: 0903-892-221\n聯絡我們: 0903892221@gmail.com',
                downloadable: false,
                iosDownloadLink: '',
                androidDownloadLink: ''
            },
            data: [
                {
                    categoryName: '無線數位',
                    count: wireless.length,
                    list: wireless
                },
                {
                    categoryName: '衛星電視',
                    count: satellite.length,
                    list: satellite
                },
                // {
                //     categoryName: '綜合娛樂',
                //     count: entertainments.length,
                //     list: entertainments
                // },
                // {
                //     categoryName: '兒少動漫',
                //     count: animes.length,
                //     list: animes
                // },
                // {
                //     categoryName: '新聞資訊',
                //     count: news.length,
                //     list: news
                // },
                // {
                //     categoryName: '戲劇電影',
                //     count: dramas.length,
                //     list: dramas
                // },
                // {
                //     categoryName: '專業體育',
                //     count: sports.length,
                //     list: sports
                // }
            ]
        });
    } catch(err) {
        return next(err);
    }
};