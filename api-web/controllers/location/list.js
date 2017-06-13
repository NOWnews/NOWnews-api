
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-web:controllers:location:list');

import config from 'config';
import axios from 'axios';
import _ from 'lodash';

import { pagination } from '../../../libs';
import { News } from '../../../models';

const getAddress = (address_components) => {
    let result = {};
    _.forEach(address_components, (component) => {
        if (component.types[0] === 'route'){
            result.route = component.long_name;
        }

        if (component.types[0] === 'locality'){
            result.locality = component.long_name;
        }

        if (component.types[0] === 'country'){
            result.country = component.long_name;
        }

        if (component.types[0] === 'postal_code_prefix'){
            result.postal_code_prefix = component.long_name;
        }

        if (component.types[0] === 'street_number'){
            result.street_number = component.long_name;
        }

        if (component.types[0] === 'administrative_area_level_1'){
            result.city = component.long_name;
        }

        if (component.types[0] === 'administrative_area_level_3'){
            result.area = component.long_name;
        }
    });

    return result;
};

module.exports = async (req, res, next) => {
    try {

        // 緯度 latitude，經度longitude
        let { lat, lng, limit, page, skip } = req.query;
        let geoKey = config.get('general.apiKeys.geocode');
        let geoUrl = config.get('general.apiUrls.geocode');

        let geoOptions = {
            params: {
                language: 'zh-TW',
                key: geoKey,
                latlng: `${lat},${lng}`
            }
        };

        let opts = {
            center: [lng, lat],
            maxDistance: 0.0005,
            spherical: true
        };

        let cursor = News.find()
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now())
            .where('status').equals('RELEASE')
            .where('location').near(opts);
        let totalCursor = News.find()
            .where('isTrashed').equals(false)
            .where('startedAt').lte(Date.now())
            .where('status').equals('RELEASE')
            .where('location').near(opts);

        let [ newsList, total, results ] = await Promise.all([
            cursor
                .populate('MainMenu MainPhoto MainVideo')
                .select('sn title shortTitle MainMenu MainPhoto MainVideo type startedAt')
                .limit(limit)
                .skip(skip)
                .sort('-startedAt')
                .execAsync(),
            totalCursor.countAsync(),
            axios.get(geoUrl, geoOptions)
        ]);

        let mapInfo = getAddress(results.data.results[0].address_components);
        mapInfo.address = results.data.results[0].formatted_address;

        // 處理分頁
        debug('total = %d', total);
        let pageData = pagination(total, limit, page, skip);
        debug('pageData = %j', pageData);

        return res.json({
            newsList,
            mapInfo,
            pageData
        });
    } catch (err) {
        return next(err);
    }
};
