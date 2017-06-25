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

        if (redisValue && !!redisValue.crazyAd) {
            return res.json(redisValue);
        }

        const opts = { encoding: null };
        const result = await Promise.all([
            // 遠大健康百科
            request(`${adServ}?ownerid=3026`, opts),
            request(`${adServ}?ownerid=3028`, opts),
            request(`${adServ}?ownerid=3029`, opts),

            // 3 (2017新版)中信房屋-貫穿全網
            request(`${adServ}?ownerid=3033`, opts),

            // crazyAd / Video
            request(`${adServ}?ownerid=9999`, opts)
        ]);

        const health = [
            transformBig5(result[0], 3026),
            transformBig5(result[1], 3028),
            transformBig5(result[2], 3029)
        ];

        const ads = {
            crazyAd: transformBig5(result[4], 9999),
            cthouse: transformBig5(result[3], 3033),
            health
        };

        await redis.setValue('adWebHome', ads, 3600);

        return res.json(ads);
    } catch (err) {
        return next(err);
    }
};
