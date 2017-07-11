/*
 * NOWlink 原生廣告，之後應該是要獨立系統從資料庫來做
 */

import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:app:nativeAd');

module.exports = async (req, res, next) => {
    try {

        const placement = req.query.placement;

        const allAds = {
            // 開機時的廣告
            lunch: {
                videoNativeADs: [
                    {
                        name: 'LunchVideoAD',
                        type: 'VIDEO',
                        size: 'FULL',
                        placement: 'lunch',
                        url: 'https://www.youtube.com/embed/jLMDoFwb4Oc',
                        md5: '1f3870be274f6c49b3e31a0c6728957f',
                        exposure: `/app/nativead/callback?placement=${placement}&name=LunchVideoAD&event=exposure`
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
                        url: 'https://www.w3schools.com/css/trolltunga.jpg',
                        md5: '1f3870be274f6c49b3e31a0c6728957f',
                        exposure: `/app/nativead/callback?placement=${placement}&name=LiveNormalAD_First&event=exposure`
                    },
                    {
                        name: 'LiveNormalAD_Second',
                        type: 'NORMAL',
                        size: 'NORMAL',
                        placement: 'LIVE',
                        url: 'https://www.w3schools.com/css/trolltunga.jpg',
                        md5: '1f3870be274f6c49b3e31a0c6728957f',
                        exposure: `/app/nativead/callback?placement=${placement}&name=LiveNormalAD_Second&event=exposure`
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
                        url: 'https://www.w3schools.com/css/trolltunga.jpg',
                        md5: '1f3870be274f6c49b3e31a0c6728957f',
                        exposure: `/app/nativead/callback?placement=${placement}&name=normalNativeADs&event=exposure`
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