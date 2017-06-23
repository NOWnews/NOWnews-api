import _ from 'lodash';
import config from 'config';
import Promise from 'bluebird';
import redis from '../../../redis';
import request from 'request-promise';
import transformBig5 from '../../../libs/transformBig5';

const adServ = config.get('web.adServ');

module.exports = async (req, res, next) => {
    try {

        const redisValue = await redis.getValue('adWebCommon');

        if (redisValue && !!redisValue.footer) {
            return res.json(redisValue);
        }

        const opts = { encoding: null };
        const result = await Promise.all([
            // Footer150x150 *5
            request(`${adServ}?ownerid=3009`, opts),
            request(`${adServ}?ownerid=3010`, opts),
            request(`${adServ}?ownerid=3011`, opts),
            request(`${adServ}?ownerid=3012`, opts),
            request(`${adServ}?ownerid=3013`, opts),

            // 跑馬燈第三個版位：全網新聞速報 *3
            request(`${adServ}?ownerid=3020`, opts),
            request(`${adServ}?ownerid=3021`, opts),
            request(`${adServ}?ownerid=3022`, opts),
        ]);

        const footer = _.map([0, 1, 2, 3, 4], (key) => {
            return transformBig5(result[key], 3009 + key);
        });

        const instant = [
            transformBig5(result[5], 3020),
            transformBig5(result[6], 3021),
            transformBig5(result[7], 3022)
        ];

        const ads = {
            footer,
            instant
        };

        await redis.setValue('adWebCommon', ads, 3600);

        return res.json(ads);
    } catch (err) {
        return next(err);
    }
};
