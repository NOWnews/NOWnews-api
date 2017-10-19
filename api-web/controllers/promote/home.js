import _ from 'lodash';
import config from 'config';
import Promise from 'bluebird';
import redis from '../../../redis';
import request from 'request-promise';
import transformBig5 from '../../../libs/transformBig5';

const adServ = config.get('web.adServ');

module.exports = async (req, res, next) => {
    try {

        const redisValue = await redis.getValue('adWebHome');

        if (redisValue && !!redisValue.triplet) {
            return res.json(redisValue);
        }

        const opts = { encoding: null };
        const result = await Promise.all([
            // 0-2 三胞胎區塊（即時新聞）
            request(`${adServ}?ownerid=3026`, opts),
            request(`${adServ}?ownerid=3028`, opts),
            request(`${adServ}?ownerid=3029`, opts),

            // 3 (2017新版)中信房屋-貫穿全網
            request(`${adServ}?ownerid=3033`, opts),

            // 4 crazyAd / Video
            request(`${adServ}?ownerid=3030`, opts),
            
            // 5-7 遠大健康百科
            request(`${adServ}?ownerid=3040`, opts),
            request(`${adServ}?ownerid=3041`, opts),
            request(`${adServ}?ownerid=3042`, opts),

            // 8-10 NiceGame
            request(`${adServ}?ownerid=3043`, opts),
            request(`${adServ}?ownerid=3044`, opts),
            request(`${adServ}?ownerid=3045`, opts),
        ]);

        const triplet = [
            transformBig5(result[0], 3026),
            transformBig5(result[1], 3028),
            transformBig5(result[2], 3029)
        ];

        const health = _.map([0, 1, 2], (key) => {
            return transformBig5(result[5 + key], 3040 + key);
        });

        const niceGame = _.map([0, 1, 2], (key) => {
            return transformBig5(result[8 + key], 3043 + key);
        });

        const ads = {
            crazyAd: transformBig5(result[4], 3030),
            cthouse: transformBig5(result[3], 3033),
            health,
            niceGame,
            triplet
        };

        await redis.setValue('adWebHome', ads, 300);

        return res.json(ads);
    } catch (err) {
        return next(err);
    }
};
