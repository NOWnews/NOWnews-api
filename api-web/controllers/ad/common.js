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
            // Footer150x150 *5
            request(`${adServ}?ownerid=3009`, config),
            request(`${adServ}?ownerid=3010`, config),
            request(`${adServ}?ownerid=3011`, config),
            request(`${adServ}?ownerid=3012`, config),
            request(`${adServ}?ownerid=3013`, config),

            // 跑馬燈第三個版位：全網新聞速報 *3
            request(`${adServ}?ownerid=3020`, config),
            request(`${adServ}?ownerid=3021`, config),
            request(`${adServ}?ownerid=3022`, config),
        ]);

        const footer = _.map([0, 1, 2, 3, 4], (key) => {
            return transformBig5(result[key]);
        });

        const instant = [
            transformBig5(result[5]),
            transformBig5(result[6]),
            transformBig5(result[7])
        ];

        return res.json({
            footer,
            instant
        });
    } catch (err) {
        return next(err);
    }
};
