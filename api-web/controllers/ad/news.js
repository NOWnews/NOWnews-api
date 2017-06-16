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

        const config = { encoding: null };
        const result = await Promise.all([
            //NOWnews 推薦 200x112 *6
            request(`${adServ}?ownerid=3014`, config),
            request(`${adServ}?ownerid=3015`, config),
            request(`${adServ}?ownerid=3016`, config),
            request(`${adServ}?ownerid=3017`, config),
            request(`${adServ}?ownerid=3018`, config),
            request(`${adServ}?ownerid=3019`, config),

            // 相關新聞 *1
            request(`${adServ}?ownerid=3024`, config),

            // 你可能會喜歡 *1
            request(`${adServ}?ownerid=3025`, config)
        ]);

        const recommand = _.map([0, 1, 2, 3, 4, 5], (key) => {
            return transformBig5(result[key]);
        });

        const ads = {
            recommand,
            relation: transformBig5(result[6]),
            like: transformBig5(result[7])
        };

        await redis.setValue('adWebCommon', ads, 180);
        return res.json(ads);

    } catch (err) {
        return next(err);
    }
};
