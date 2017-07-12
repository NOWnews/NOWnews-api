/*
 * NOWlink 原生廣告，之後應該是要獨立系統從資料庫來做
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:app:nativeAd');

module.exports = async (req, res, next) => {
    try {

        const placement = req.query.placement;

        let allVideoADs = [
            {
                url: 'https://img.nownews.com/nownews_develop/videos/5964e8578f7ff61321537118_201707112301.mp4',
                md5: 'e0405138c9169f200c8c2f76637e7dcd'
            },
            {
                url: 'https://img.nownews.com/nownews_develop/videos/5964e9958f7ff61321537119_201707112307.mp4',
                md5: '14334c0f1f4f80f60c7056e20aa3b1bf'
            }
        ];

        let randomNumber = Math.floor( Math.random() * allVideoADs.length );
        let showVideoAd = allVideoADs[randomNumber];

        const allAds = {
            // 開機時的廣告，會隨機吐影音廣告
            lunch: {
                videoNativeADs: [
                    {
                        name: 'LunchVideoAD',
                        type: 'VIDEO',
                        size: 'FULL',
                        placement: 'lunch',
                        url: showVideoAd.url,
                        md5: showVideoAd.md5,
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
                        url: 'https://img.nownews.com/nownews_develop/images/5964ed2d9c29ea1779c477b3_201707112322.jpg',
                        md5: '0793be4485e5ec90d53ba4de3d18ea99',
                        impression: `/app/nativead/callback?placement=${placement}&name=LiveNormalAD_First&event=impression`
                    },
                    {
                        name: 'LiveNormalAD_Second',
                        type: 'NORMAL',
                        size: 'NORMAL',
                        placement: 'LIVE',
                        url: 'https://img.nownews.com/nownews_develop/images/5964ed559c29ea1779c477b4_201707112323.jpg',
                        md5: '22b926f43129e23812207ff8e1b66a05',
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
                        url: 'https://img.nownews.com/nownews_develop/images/5964ecdea941fb165187901d_201707112321.jpg',
                        md5: '83e5691db3728b769e4f662b9e382dae',
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