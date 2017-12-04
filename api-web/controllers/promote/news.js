import _ from 'lodash';
import config from 'config';
import Promise from 'bluebird';
import redis from '../../../redis';
import request from 'request-promise';
import transformBig5 from '../../../libs/transformBig5';

const adServ = config.get('web.adServ');

module.exports = async (req, res, next) => {
    try {

        const redisValue = await redis.getValue('adWebNews');
        
        if (redisValue && !!redisValue.recommand) {
            return res.json(redisValue);
        }

        const opts = { encoding: null };
        const result = await Promise.all([
            //NOWnews 推薦 200x112 *9
            request(`${adServ}?ownerid=3014`, opts),
            request(`${adServ}?ownerid=3015`, opts),
            request(`${adServ}?ownerid=3016`, opts),
            request(`${adServ}?ownerid=3017`, opts),
            request(`${adServ}?ownerid=3018`, opts),
            request(`${adServ}?ownerid=3019`, opts),
            request(`${adServ}?ownerid=3032`, opts),
            request(`${adServ}?ownerid=3038`, opts),
            request(`${adServ}?ownerid=3039`, opts),

            // 相關新聞 *1
            request(`${adServ}?ownerid=3024`, opts),

            // 你可能會喜歡 *1
            request(`${adServ}?ownerid=3025`, opts)
        ]);

        const recommandNos = [3014, 3015, 3016, 3017, 3018, 3019, 3032, 3038, 3039];

        const recommand = _.map([0, 1, 2, 3, 4, 5, 6, 7, 8], (key) => {
            return transformBig5(result[key], recommandNos[key]);
        });

        const ads = {
            recommand,
            relation: transformBig5(result[9], 3024),
            like: transformBig5(result[10], 3025)
        };

        await redis.setValue('adWebNews', ads, 300);
        return res.json(ads);

    } catch (err) {
        return next(err);
    }
};
