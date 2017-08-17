
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:tv:channels');

import { Address6 } from 'ip-address';
import axios from 'axios';
import _ from 'lodash';

import redis from '../../../redis';
import { getChannelsByPlatform } from '../../../libs';
import { Provider } from '../../../ottModels';

module.exports = async (req, res, next) => {
    try {

        let platform = req.query.platform || 'NOWNEWS';

        /*
         * 處理 ip，那個 'x-real-ip' 不知道是哪個該死的設定在 nginx 裡面取代 remote address
         */
        let ipString = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let isIPV6 = new Address6(ipString);
        if(isIPV6.isValid()) {
            ipString = isIPV6.to4().address;
        }
        debug('ip string = %s', ipString);

        // 拿 ip 去跟防盜連做註冊
        let { data: registerData } = await axios.get(`http://61.67.121.80:10011/api/wowza/register?ip=${ipString}`);
        debug('registerData = %s', registerData);

        // 從 redis 取出資料
        let result = await redis.getValue(`OTTProvider${platform}`);
        if(!result) {
            result = await getChannelsByPlatform(platform);
        }

        // 將串流的資料加入防盜連
        _.forEach(result.data, (data) => {
            _.forEach(data.list, (item) => {
                item.path = `${item.path}?johncena=${registerData.johncena}`;
            });
        });

        return res.json(result);
    } catch(err) {
        return next(err);
    }
};