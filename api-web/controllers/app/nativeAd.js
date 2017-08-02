/*
 * NOWlink 原生廣告，之後應該是要獨立系統從資料庫來做
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:app:nativeAd');

import _ from 'lodash';

module.exports = async (req, res, next) => {
    try {

        const placement = req.query.placement;

        // 一般圖片廣告
        let normalImageAds = [
            {
                url: 'https://img.nownews.com/nownews_production/images/596f0a7592a64942762bee7c_201707191529.png',
                md5: '934c563cb55bfdf39e35b7ab7401f4f1'
            },
            {
                url: 'https://img.nownews.com/nownews_production/images/596f0a7566154442aac619e7_201707191529.png',
                md5: '3d13600f107cd71ba36e553775987d58'
            },
            {
                url: 'https://img.nownews.com/nownews_production/images/596f0a755a53eb427052ea6e_201707191529.png',
                md5: 'a33f983fc85ef31cd787e441597a12cd'
            },
            {
                url: 'https://img.nownews.com/nownews_production/images/596f0a7666154442aac619e8_201707191529.png',
                md5: '1798c0e6b3bd93718948f6940b21ac3e'
            },
            {
                url: 'https://img.nownews.com/nownews_production/images/596f0a75ff232542b0bcc10a_201707191529.png',
                md5: '47f72b8fc4ebdfeb832df464d359495a'
            },
        ];

        // banner 型圖片廣告
        let bannerImageAds = [
            {
                url: 'https://img.nownews.com/nownews_production/images/596f0da05a53eb427052ea84_201707191543.png',
                md5: '236c8755f9513079213f13dd55b6bd48'
            },
            {
                url: 'https://img.nownews.com/nownews_production/images/596f0dcf5a53eb427052ea85_201707191544.png',
                md5: 'c1425661da754a21be7960b81f14b532'
            },
            {
                url: 'https://img.nownews.com/nownews_production/images/596f0cf0ff232542b0bcc11c_201707191540.png',
                md5: '41bf05ed002b81c0a89956acd041be5c'
            },
            {
                url: 'https://img.nownews.com/nownews_production/images/596f0d1466154442aac619fb_201707191541.png',
                md5: 'c4a00d13388ac088959a07a76daf7d4e'
            },
            {
                url: 'https://img.nownews.com/nownews_production/images/596f0d3a92a64942762bee95_201707191541.png',
                md5: 'b4bf19672b3838080d1fe8835295a6e2'
            }
        ];

        // 影音廣告
        let allVideoADs = [
            {
                url: 'https://img.nownews.com/nownews_production/videos/597728d04ed41a01c6f27826_201707251917.mp4',
                md5: 'a60752ad4aa146e170a2cdcf37da16ad'
            },
            {
                url: 'https://img.nownews.com/nownews_production/videos/59772947e6e9df01ba582311_201707251919.mp4',
                md5: '79b1459387f5156729056440bd70d3fa'
            }
        ];

        let showVideoAd = _.sampleSize(allVideoADs, 1);
        let recommendImageAd = _.sampleSize(bannerImageAds, 1);
        let liveImageAd = _.sampleSize(normalImageAds, 2);

        const allAds = {
            // 開機時的廣告，會隨機吐影音廣告
            lunch: {
                videoNativeADs: [
                    {
                        name: 'LunchVideoAD',
                        type: 'VIDEO',
                        size: 'FULL',
                        placement: 'lunch',
                        url: showVideoAd[0].url,
                        md5: showVideoAd[0].md5,
                        impression: `/app/nativead/callback?placement=${placement}&name=LunchVideoAD&event=impression`
                    }
                ]
            },
            // 直播頁的廣告
            live: {
                normalNativeADs: [
                    {
                        name: 'LiveNormalAD_First',
                        type: 'NORMAL',
                        size: 'NORMAL',
                        placement: 'LIVE',
                        url: liveImageAd[0].url,
                        md5: liveImageAd[0].md5,
                        impression: `/app/nativead/callback?placement=${placement}&name=LiveNormalAD_First&event=impression`
                    },
                    {
                        name: 'LiveNormalAD_Second',
                        type: 'NORMAL',
                        size: 'NORMAL',
                        placement: 'LIVE',
                        url: liveImageAd[1].url,
                        md5: liveImageAd[1].md5,
                        impression: `/app/nativead/callback?placement=${placement}&name=LiveNormalAD_Second&event=impression`
                    },
                ]
            },
            // 推薦頁的廣告
            recommend: {
                normalNativeADs: [
                    {
                        name: 'RecommendNormalAD_Cover',
                        type: 'NORMAL',
                        size: 'FULL',
                        placement: 'RECOMMEND',
                        url: recommendImageAd[0].url,
                        md5: recommendImageAd[0].md5,
                        impression: `/app/nativead/callback?placement=${placement}&name=normalNativeADs&event=impression`
                    }
                ]
            }
        };

        let result = allAds[placement];

        if(!result) {
            result = {};
        }

        return res.json(result);
    } catch(err) {
        return next(err);
    }
};