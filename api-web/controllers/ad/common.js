import axios from 'axios';
import config from 'config';
import _ from 'lodash';
import Promise from 'bluebird';

const adServ = config.get('web.adServ');

module.exports = async (req, res, next) => {
    try {
        const result = await Promise.all([
            // Footer150x150 *5 - 圖片
            axios.get(`${adServ}?ownerid=3009`),
            axios.get(`${adServ}?ownerid=3010`),
            axios.get(`${adServ}?ownerid=3011`),
            axios.get(`${adServ}?ownerid=3012`),
            axios.get(`${adServ}?ownerid=3013`),

            // Footer150x150 *5 - 文字
            axios.get(`${adServ}?ownerid=3014`),
            axios.get(`${adServ}?ownerid=3015`),
            axios.get(`${adServ}?ownerid=3016`),
            axios.get(`${adServ}?ownerid=3017`),
            axios.get(`${adServ}?ownerid=3018`),

            // 跑馬燈第三個版位：全網新聞速報 *3
            axios.get(`${adServ}?ownerid=3030`),
            axios.get(`${adServ}?ownerid=3031`),
            axios.get(`${adServ}?ownerid=3032`),
        ]);

        const footer = _.map([0, 1, 2, 3, 4], (key) => {
            return {
                img: result[key].data,
                word: result[key + 5].data
            }
        });

        const instant = [result[10].data, result[11].data, result[12].data];

        return res.json({
            footer,
            instant
        });
    } catch (err) {
        return next(err);
    }
};
