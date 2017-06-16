import axios from 'axios';
import config from 'config';
import _ from 'lodash';
import Promise from 'bluebird';

const adServ = config.get('web.adServ');

module.exports = async (req, res, next) => {
    try {
        const result = await Promise.all([
            // NOWnews推薦 200x112 *6 (圖, 文字)
            axios.get(`${adServ}?ownerid=3019`),
            axios.get(`${adServ}?ownerid=3020`),
            axios.get(`${adServ}?ownerid=3021`),
            axios.get(`${adServ}?ownerid=3022`),
            axios.get(`${adServ}?ownerid=3023`),
            axios.get(`${adServ}?ownerid=3024`),
            axios.get(`${adServ}?ownerid=3025`),
            axios.get(`${adServ}?ownerid=3026`),
            axios.get(`${adServ}?ownerid=3027`),
            axios.get(`${adServ}?ownerid=3028`),
            axios.get(`${adServ}?ownerid=3037`),
            axios.get(`${adServ}?ownerid=3038`),

            // 相關新聞 *1
            axios.get(`${adServ}?ownerid=3035`),

            // 你可能會喜歡 *1
            axios.get(`${adServ}?ownerid=3036`)
        ]);

        const recommand = _.map([0, 2, 4, 6, 8, 10], (key) => {
            return {
                img: result[key].data,
                word: result[key + 1].data
            }
        });

        return res.json({
            recommand,
            relation: result[12].data,
            like: result[13].data
        });

    } catch (err) {
        return next(err);
    }
};
