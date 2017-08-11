
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:tv:channels');

import { Address6 } from 'ip-address';
import axios from 'axios';
import _ from 'lodash';
import { Provider } from '../../../ottModels';

module.exports = async (req, res, next) => {
    try {

        let platform = req.params.platform || 'NOWNEWS';

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

        let provider = await Provider.findOne()
            .where('platform').equals(platform)
            .where('isTrashed').equals(false)
            .deepPopulate('data data.channels')
            .lean()
            .execAsync();

        let result = {
            liveInfo: {},
            data: []
        };

        result.liveInfo.watchTime = provider.watchTime;
        result.liveInfo.lockTime = provider.lockTime;
        result.liveInfo.watchable = provider.watchable;
        result.liveInfo.icon = provider.icon;
        result.liveInfo.titleMessage = provider.titleMessage;
        result.liveInfo.downloadable = provider.downloadable;
        result.liveInfo.iosDownloadLink = provider.iosDownloadLink;
        result.liveInfo.androidDownloadLink = provider.androidDownloadLink;
        result.liveInfo.videoAD = provider.videoAD;


        _.forEach(provider.data, (category) => {
            let obj = {
                list: []
            };
            obj.categoryName = category.name;
            obj.count = category.channels.length;

            _.forEach(category.channels, (channel) => {
                obj.list.push({
                    SN: '',
                    code: '',
                    title: channel.name,
                    path: `${channel.path}?johncena=${registerData.johncena}`
                });
            });

            result.data.push(obj);
        });
        console.log(result);



        // 綜合娛樂
        let entertainments = [
            {
                SN: '',
                code: '',
                title: '中天綜合台',
                path: `http://59.124.93.43:1935/live/nns188.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: 'TVBS',
                path: `http://59.124.93.43:1935/live/nns170.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '民視台灣台',
                path: `http://59.124.93.43:1935/live/nns154.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: 'Nice TV',
                path: `http://59.124.93.43:1935/live/nns145.stream/playlist.m3u8?johncena=${registerData.johncena}`
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
                title: '靖天日本台',
                path: `http://59.124.93.43:1935/live/nns141.stream/playlist.m3u8?johncena=${registerData.johncena}`
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
                title: 'CN卡通頻道',
                path: `http://59.124.93.43:1935/live/nns209.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '靖天卡通台',
                path: `http://59.124.93.43:1935/live/nns138.stream/playlist.m3u8?johncena=${registerData.johncena}`
            }
        ];

        // 新聞訊息
        let news = [
            {
                SN: '',
                code: '',
                title: '民視新聞台',
                path: `http://59.124.93.43:1935/live/nns199.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '中天新聞台',
                path: `http://59.124.93.43:1935/live/nns198.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '東森新聞台',
                path: `http://59.124.93.43:1935/live/nns197.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: 'TVBS-N',
                path: `http://59.124.93.43:1935/live/nns169.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '非凡新聞台',
                path: `http://59.124.93.43:1935/live/nns172.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: 'CNN',
                path: `http://59.124.93.43:1935/live/nns152.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '東森財經新聞',
                path: `http://59.124.93.43:1935/live/nns171.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
        ];

        // 電影戲劇
        let dramas = [
            {
                SN: '',
                code: '',
                title: '靖天戲劇台',
                path: `http://59.124.93.43:1935/live/nns140.stream/playlist.m3u8?johncena=${registerData.johncena}`
            }
        ];

        // 體育競賽
        let sports = [
            {
                SN: '',
                code: '',
                title: '靖天育樂台',
                path: `http://59.124.93.43:1935/live/nns139.stream/playlist.m3u8?johncena=${registerData.johncena}`
            }
        ];

        // 數位無線
        let wireless = [
            {
                SN: '',
                code: '',
                title: '民視',
                path: `http://59.124.93.43:1935/live/nns153.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
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
            }
        ];

        // 衛星電視
        // let satellite = [
            // {
            //     SN: '',
            //     code: '',
            //     title: '北京國際台',
            //     path: `http://59.124.93.43:1935/live/gw112.stream/playlist.m3u8?johncena=${registerData.johncena}`
            // },
            // {
            //     SN: '',
            //     code: '',
            //     title: '湖南國際電視',
            //     path: `http://59.124.93.43:1935/live/gw117.stream/playlist.m3u8?johncena=${registerData.johncena}`
            // },
            // {
            //     SN: '',
            //     code: '',
            //     title: '上海東方衛視',
            //     path: `http://59.124.93.43:1935/live/gw113.stream/playlist.m3u8?johncena=${registerData.johncena}`
            // },
            // {
            //     SN: '',
            //     code: '',
            //     title: '深圳電視台',
            //     path: `http://59.124.93.43:1935/live/gw118.stream/playlist.m3u8?johncena=${registerData.johncena}`
            // },
        // ];

        // 資訊生活
        let lifeInformation = [
            {
                SN: '',
                code: '',
                title: '非凡商業台',
                path: `http://59.124.93.43:1935/live/cfr230.stream/playlist.m3u8?johncena=${registerData.johncena}`
            },
            {
                SN: '',
                code: '',
                title: '靖天資訊台',
                path: `http://59.124.93.43:1935/live/nns143.stream/playlist.m3u8?johncena=${registerData.johncena}`
            }
        ];

        // 宗教信仰
        let belief = [
            {
                SN: '',
                code: '',
                title: '大愛電視台',
                path: `http://59.124.93.43:1935/live/cfr059.stream/playlist.m3u8?johncena=${registerData.johncena}`
            }
        ];

        return res.json({
            liveInfo: {
                watchTime: 20,
                lockTime: 30,
                watchable: true,
                icon: 'http://legacy.nownews.com/NOWnews_static/ios512.png',
                titleMessage: '本服務由天暢國際股份有限公司提供\n\n線上客服請搜尋 LINE/wechat ID：nowlink_cs',
                downloadable: false,
                iosDownloadLink: '',
                androidDownloadLink: '',
                videoAD: true
            },
            data: [

                {
                    categoryName: '綜合娛樂',
                    count: entertainments.length,
                    list: entertainments
                },
                {
                    categoryName: '兒少動漫',
                    count: animes.length,
                    list: animes
                },
                {
                    categoryName: '新聞訊息',
                    count: news.length,
                    list: news
                },
                {
                    categoryName: '電影戲劇',
                    count: dramas.length,
                    list: dramas
                },
                {
                    categoryName: '體育競賽',
                    count: sports.length,
                    list: sports
                },
                {
                    categoryName: '數位無線',
                    count: wireless.length,
                    list: wireless
                },
                {
                    categoryName: '資訊生活',
                    count: lifeInformation.length,
                    list: lifeInformation
                },
                {
                    categoryName: '宗教信仰',
                    count: belief.length,
                    list: belief
                }
            ]
        });
    } catch(err) {
        return next(err);
    }
};