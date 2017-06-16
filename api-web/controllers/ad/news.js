import _ from 'lodash';
import config from 'config';
import Promise from 'bluebird';
import request from 'request-promise';
import transformBig5 from '../../../libs/transformBig5';

const adServ = config.get('web.adServ');

module.exports = async (req, res, next) => {
    try {
        const config = { encoding: null };
        const result = await Promise.all([
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

        return res.json({
            recommand,
            relation: transformBig5(result[6]),
            like: transformBig5(result[7])
        });

    } catch (err) {
        return next(err);
    }
};
